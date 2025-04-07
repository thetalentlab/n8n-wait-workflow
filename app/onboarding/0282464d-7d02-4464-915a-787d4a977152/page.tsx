/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCurrentExecution } from "@/actions/execution";
import Summary from "./_components/summary";
import SummarySkeleton from "./_components/summary-skeleton";
import { RESUME_URL } from "@/lib/constants";
import { getCookie, setCookie } from "@/lib/cookies";
import { extractData } from "@/lib/utils";
import { redirect, RedirectType } from "next/navigation";
import { Suspense } from "react";

export default async function ConfirmSummaryPage() {
  const executionId = await getCookie("executionId");
  const currentExecution = await getCurrentExecution(executionId as string);
  const isExecutionFinished = currentExecution.finished;
  const executionStatus = currentExecution.status;

  const summary = await getCookie("summary");
  const parsedSummary = summary ? JSON.parse(summary as any) : {};
  const summaryData: Summary = extractData(parsedSummary);

  if (isExecutionFinished || executionStatus === "canceled") {
    return redirect(`/`);
  }

  const handleSubmit = async (data: Summary) => {
    "use server";
    const url = `${RESUME_URL}/${executionId}`;
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      mode: "no-cors",
      cache: "no-store",
    });
    const responseData = await res.json();
    await setCookie("confirmedSummary", JSON.stringify(responseData));
    redirect(`/onboarding`, RedirectType.replace);
  };

  return (
    <Suspense fallback={<SummarySkeleton />}>
      <div className="min-h-screen h-full flex flex-col gap-4 items-center justify-center p-8 lg:p-4">
        <Summary data={summaryData} handleSubmit={handleSubmit} />
      </div>
    </Suspense>
  );
}
