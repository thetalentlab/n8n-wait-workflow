import { getCurrentExecution } from "@/actions/execution";
import { getCurrentWaitNode } from "@/actions/node";
import { getCookie } from "@/lib/cookies";
import { redirect } from "next/navigation";

export default async function OnboardingPage() {
  const executionId = await getCookie("executionId");
  const currentWaitNode = await getCurrentWaitNode(executionId as string);
  const currentExecution = await getCurrentExecution(executionId as string);

  if (currentExecution.finished && currentExecution.status === "success") {
    return redirect(`/onboarding/success`);
  }
  if (currentExecution.status === "canceled") {
    return redirect(`/onboarding/canceled`);
  }
  if (currentWaitNode?.id) {
    return redirect(`/onboarding/${currentWaitNode?.id}`);
  }

  return (
    <div className="w-full h-full min-h-screen flex flex-col gap-4 items-center justify-center">
      <h1 className="text-4xl font-bold">Onboarding page</h1>
      <p>Execution ID: {executionId}</p>
      <p>Current Wait Node: {currentWaitNode?.name}</p>
      <p>Current Execution status: {currentExecution?.status} </p>
    </div>
  );
}
