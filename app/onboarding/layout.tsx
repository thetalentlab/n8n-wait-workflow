import { getCurrentExecution } from "@/actions/execution";
import { RESUME_URL } from "@/lib/constants";
import { getCookie } from "@/lib/cookies";
import { redirect, RedirectType } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const executionId = await getCookie("executionId");
  const currentExecution = await getCurrentExecution(executionId as string);

  async function resumeExecution() {
    "use server";
    if (currentExecution.finished) return;
    const url = `${RESUME_URL}/${executionId}`;
    console.log("Resume URL: ", url);
    await fetch(url, {
      mode: "no-cors",
      cache: "no-store",
    });
    console.log("redirecting...");
    redirect(`/onboarding`, RedirectType.replace);
  }

  return (
    <div className="w-full h-full min-h-screen flex flex-col justify-between">
      {children}
      <div className="text-xs bg-slate-100 py-2 px-4">
        <p>Current Execution: {currentExecution?.status} </p>
      </div>
    </div>
  );
}
