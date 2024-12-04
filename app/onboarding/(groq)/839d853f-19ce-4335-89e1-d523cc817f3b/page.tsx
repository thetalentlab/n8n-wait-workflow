/* eslint-disable @typescript-eslint/no-explicit-any */
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
  const allQuestions = suggestedQuestions
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
    const filtredQuestions = allQuestions.filter((question: any) =>
      selectedQuestions.includes(question.content)
    );
    console.log("selectedQuestions", selectedQuestions);
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ selectedQuestions: filtredQuestions }),
      mode: "no-cors",
      cache: "no-store",
    });
    console.log("redirecting...");
    redirect(`/onboarding`, RedirectType.replace);
  };
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col w-full h-full min-h-screen gap-8 items-center justify-center">
        <div className="gap-3 text-center">
          <h1 className="text-3xl font-semibold sm:text-3xl md:text-4xl">
            Which questions should be answered?
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            These questions will help refine the course structure.
          </p>
        </div>
        <SelectQuestions questions={allQuestions} handleNext={handleNext} />
      </div>
    </Suspense>
  );
}
