import { Suspense } from "react";
import LearningGoal from "./_components/learning-goal";
import { getCookie, setCoockie } from "@/lib/cookies";
import { getCurrentExecution } from "@/actions/execution";
import { RESUME_URL } from "@/lib/constants";
import { redirect, RedirectType } from "next/navigation";

export default async function LearningGoalPage() {
  const executionId = await getCookie("executionId");
  const currentExecution = await getCurrentExecution(executionId as string);
  const isExecutionFinished = currentExecution.finished;
  const executionStatus = currentExecution.status;

  if (isExecutionFinished || executionStatus === "canceled") {
    return redirect(`/`);
  }

  const handleNext = async (formData: FormData) => {
    "use server";
    const learningGoal = formData.get("learningGoal");
    if (
      learningGoal === "" ||
      isExecutionFinished ||
      executionStatus === "canceled"
    )
      return;
    console.log("Learning Goal: ", learningGoal);
    const url = `${RESUME_URL}/${executionId}`;
    const res = await fetch(url, {
      mode: "no-cors",
      method: "POST",
      body: JSON.stringify({ learningGoal }),
    });
    console.log("res", res);
    const suggestedTopics = await res.json();
    console.log("suggestedTopics", suggestedTopics);
    await setCoockie("suggestedTopics", JSON.stringify(suggestedTopics));

    console.log("redirecting...");

    redirect(`/onboarding`, RedirectType.replace);
  };

  return (
    <div className="h-full min-h-screen flex flex-col gap-4 items-center justify-center px-8 lg:px-4">
      <Suspense fallback={<p>loading...</p>}>
        <h1 className="text-4xl font-semibold">What do you want to learn?</h1>
        <LearningGoal handleNext={handleNext} />
      </Suspense>
    </div>
  );
}
