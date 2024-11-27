import { getCurrentExecution } from "@/actions/execution";
import Preferences from "./_components/preferences";
import PreferencesSkeleton from "./_components/preferences-skeleton";
import { RESUME_URL } from "@/lib/constants";
import { getCookie } from "@/lib/cookies";
import { Suspense } from "react";
import { redirect, RedirectType } from "next/navigation";

export default async function LearningPreferencesPage() {
  const resumeUrl = `${RESUME_URL}/${await getCookie("executionId")}`;
  const executionId = await getCookie("executionId");
  const currentExecution = await getCurrentExecution(executionId as string);
  const isExecutionFinished = currentExecution.finished;
  const executionStatus = currentExecution.status;

  if (isExecutionFinished || executionStatus === "canceled") {
    return redirect(`/`);
  }

  const handleNext = async (preferences: string[]) => {
    "use server";
    const url = `${RESUME_URL}/${executionId}`;

    console.log(preferences);

    const res = await fetch(url, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify({ learningPreferences: preferences }),
    });

    if (res.ok) {
      console.log("redirecting...");
      redirect(`/onboarding`, RedirectType.replace);
    } else {
      return {
        error: "Something went wrong",
      };
    }
  };

  return (
    <div className="h-full min-h-screen flex flex-col gap-4 items-center justify-center px-8 lg:px-4">
      <Suspense fallback={<PreferencesSkeleton />}>
        <Preferences handleNext={handleNext} />
      </Suspense>
    </div>
  );
}
