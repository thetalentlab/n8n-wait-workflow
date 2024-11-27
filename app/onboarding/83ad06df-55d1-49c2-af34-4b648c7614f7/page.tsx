import { getCurrentExecution } from "@/actions/execution";
import Summary from "./_components/summary";
import SummarySkeleton from "./_components/summary-skeleton";
import { RESUME_URL } from "@/lib/constants";
import { getCookie, setCoockie } from "@/lib/cookies";
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
  console.log({ parsedSummary });
  console.log(summaryData);

  if (isExecutionFinished || executionStatus === "canceled") {
    return redirect(`/`);
  }

  const handleSubmit = async (data: any) => {
    "use server";
    console.log("data", data);
    const url = `${RESUME_URL}/${executionId}`;
    console.log("Resume URL: ", url);
    const res = await fetch(url, {
      method: "POST",
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
      <div className="min-h-screen h-full flex flex-col gap-4 items-center justify-center p-8 lg:p-4">
        <h1 className="text-4xl font-semibold mt-4">
          Your transformation details
        </h1>
        <p>A quick overview of your transformation details and preferences.</p>
        <Summary data={summaryData} handleSubmit={handleSubmit} />
      </div>
    </Suspense>
  );
}
