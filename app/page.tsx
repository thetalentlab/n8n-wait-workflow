import { getCurrentExecution } from "@/actions/execution";
import { getWorkflowsByTagName } from "@/actions/workflow";
import Workflowcards from "@/components/workflow-cards";

export default async function Home() {
  const workflows = await getWorkflowsByTagName("flashclass");

  return (
    <div className="h-full flex flex-col gap-4 items-center justify-center px-8 lg:px-4">
      <Workflowcards workflows={workflows} />
    </div>
  );
}
