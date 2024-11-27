import { getCurrentExecution } from "@/actions/execution";
import SelectQuestions from "./_components/select-questions";
import { RESUME_URL } from "@/lib/constants";
import { getCookie } from "@/lib/cookies";
import { redirect, RedirectType } from "next/navigation";
import { Suspense } from "react";

export default async function SelectQuestionsPage() {
  const executionId = await getCookie("executionId");
  const currentExecution = await getCurrentExecution(executionId as string);
  const isExecutionFinished = currentExecution.finished;
  const executionStatus = currentExecution.status;
  const suggestedQuestions = await getCookie("suggestedQuestions");
  const questions = suggestedQuestions
    ? JSON.parse(suggestedQuestions as any)?.questions
    : [];

  if (isExecutionFinished || executionStatus === "canceled") {
    return redirect(`/`);
  }

  const handleNext = async (formData: FormData) => {
    "use server";
    const url = `${RESUME_URL}/${executionId}`;
    console.log("Resume URL: ", url);
    const selectedQuestions = formData.getAll("question");
    console.log("selectedQuestions", selectedQuestions);
    await fetch(url, {
      method: "POST",
      body: JSON.stringify({ selectedQuestions }),
      mode: "no-cors",
      cache: "no-store",
    });
    console.log("redirecting...");
    redirect(`/onboarding`, RedirectType.replace);
  };
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col w-full h-full min-h-screen gap-8 items-center justify-center">
        <h1 className="text-4xl font-semibold max-w-2xl">
          What questions do you want to be able to answer by the end of the
          course?
        </h1>
        <SelectQuestions questions={questions} handleNext={handleNext} />
      </div>
    </Suspense>
  );
}
