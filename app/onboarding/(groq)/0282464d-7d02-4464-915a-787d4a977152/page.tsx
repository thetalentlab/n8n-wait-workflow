/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCurrentExecution } from "@/actions/execution";
import Summary from "./_components/summary";
import SummarySkeleton from "./_components/summary-skeleton";
import { RESUME_URL } from "@/lib/constants";
import { getCookie, setCoockie } from "@/lib/cookies";
// import { extractData } from "@/lib/utils";
import { redirect, RedirectType } from "next/navigation";
import { Suspense } from "react";
import { extractData } from "@/lib/utils";

export default async function ConfirmSummaryPage() {
  const executionId = await getCookie("executionId");
  const currentExecution = await getCurrentExecution(executionId as string);
  const isExecutionFinished = currentExecution.finished;
  const executionStatus = currentExecution.status;

  const summary = await getCookie("summary");
  const parsedSummary = summary ? JSON.parse(summary as any) : {};
  const summaryData: GroqSummary = extractData(parsedSummary);
  console.dir(summaryData, { depth: null });
  // console.log(summaryData);

  if (isExecutionFinished || executionStatus === "canceled") {
    return redirect(`/`);
  }

  const handleSubmit = async (data: GroqSummary) => {
    "use server";
    console.log("data", data);
    const url = `${RESUME_URL}/${executionId}`;
    console.log("Resume URL: ", url);
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      mode: "no-cors",
      cache: "no-store",
    });
    console.log("res", res);
    const responseData = await res.json();
    console.log("data", responseData);
    await setCoockie("confirmedSummary", JSON.stringify(responseData));
    redirect(`/onboarding`, RedirectType.replace);
  };

  return (
    <Suspense fallback={<SummarySkeleton />}>
      <div className="min-h-screen h-full flex flex-col gap-4 items-center justify-center p-8 lg:p-14">
        <Summary data={summaryData} handleSubmit={handleSubmit} />
      </div>
    </Suspense>
  );
}
