/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCurrentExecution } from "@/actions/execution";
import { RESUME_URL } from "@/lib/constants";
import { getCookie, setCookie } from "@/lib/cookies";
import { redirect, RedirectType } from "next/navigation";
import { Suspense } from "react";
import Topics from "./_components/topics";

export default async function SortTopicsPage() {
  const executionId = await getCookie("executionId");
  const currentExecution = await getCurrentExecution(executionId as string);
  const isExecutionFinished = currentExecution.finished;
  const executionStatus = currentExecution.status;
  const suggestedTopics = await getCookie("suggestedTopics");
  const initialTopics = suggestedTopics
    ? JSON.parse(suggestedTopics as any)?.topics
    : [];

  if (isExecutionFinished || executionStatus === "canceled") {
    redirect(`/`);
  }

  async function handleNext(topics: SelectedTopics) {
    "use server";
    const url = `${RESUME_URL}/${executionId}`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ topics }),
      mode: "no-cors",
      cache: "no-store",
    });

    if (res.ok) {
      const suggestedQuestions = await res.json();
      await setCookie(
        "suggestedQuestions",
        JSON.stringify(suggestedQuestions)
      );
      redirect(`/onboarding`, RedirectType.replace);
    } else {
      return {
        error: "Something went wrong",
      };
    }
  }

  return (
    <div className="h-full min-h-screen flex flex-col items-center justify-center px-8 lg:px-4 bg-gradient-to-br from-gray-50 to-gray-100">
      <Suspense fallback={<div>Loading...</div>}>
        <Topics initialTopics={initialTopics} handleNext={handleNext} />
      </Suspense>
    </div>
  );
}
