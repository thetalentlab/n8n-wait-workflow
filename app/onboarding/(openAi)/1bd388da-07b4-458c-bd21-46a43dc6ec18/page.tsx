import { getCurrentExecution } from "@/actions/execution";
import { RESUME_URL } from "@/lib/constants";
import { getCookie, setCoockie } from "@/lib/cookies";
import SelectTime from "./_components/select-time";
import { redirect, RedirectType } from "next/navigation";
import { Suspense } from "react";

export default async function SelectTimePage() {
  const executionId = await getCookie("executionId");
  const currentExecution = await getCurrentExecution(executionId as string);
  const isExecutionFinished = currentExecution.finished;
  const executionStatus = currentExecution.status;

  if (isExecutionFinished || executionStatus === "canceled") {
    redirect(`/`, RedirectType.replace);
  }

  async function handleNext(formData: FormData) {
    "use server";
    const url = `${RESUME_URL}/${executionId}`;
    console.log("sending selected time...");
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        time: {
          duration: formData.get("duration"),
          frequency: formData.get("frequency"),
        },
      }),
      mode: "no-cors",
      cache: "no-store",
    });

    const summary = await res.json();
    console.log("summary", summary);
    await setCoockie("summary", JSON.stringify(summary));
    console.log("redirecting...");
    redirect(`/onboarding`, RedirectType.replace);
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen h-full flex flex-col gap-4 items-center justify-center px-8 lg:px-4">
        <h1 className="text-4xl font-semibold mb-4">
          When do you want to learn?
        </h1>
        <SelectTime handleNext={handleNext} />
      </div>
    </Suspense>
  );
}
