import { getCurrentExecution } from "@/actions/execution";
import { getCookie } from "@/lib/cookies";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const executionId = await getCookie("executionId");
  const currentExecution = await getCurrentExecution(executionId as string);

  return (
    <div className="w-full h-full min-h-screen flex flex-col justify-between">
      {children}
      <div className="text-xs bg-slate-100 py-2 px-4">
        <p>Current Execution: {currentExecution?.status} </p>
      </div>
    </div>
  );
}
