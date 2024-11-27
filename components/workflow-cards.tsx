"use client";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "./ui/button";
import { useState } from "react";
import exectuteWorkflow from "@/actions/execution";
import { setCoockie } from "@/lib/cookies";
import { redirect } from "next/navigation";

export default function WorkflowCards({
  workflows,
}: {
  workflows: Workflow[];
}) {
  // get all webhook nodes that can trigger the workflow to execute
  const webhookNodes = workflows
    .map(({ nodes }) =>
      nodes.filter(
        (node) => node.type === "n8n-nodes-base.webhook" && node.webhookId
      )
    )
    .flat();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<{
    code: number;
    message: string;
    hint: string;
  } | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    webhookNodes[0].webhookId
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const webhookTriggerId = selectedValue;
    if (webhookTriggerId) {
      const data = await exectuteWorkflow(webhookTriggerId);
      if (data.code === 404) {
        setError(data);
        setIsLoading(false);
        setIsSuccess(false);
      } else {
        const executionId = data.id;
        if (!executionId) return;
        setIsSuccess(true);
        console.log("Starting execution with id:", executionId);
        // Set the executionId as a cookie
        await setCoockie("executionId", executionId);
        // const currentWaitNode = await getCurrentWaitNode(executionId as string);
        setError(null);
        setIsLoading(false);
        await redirect(`/onboarding`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
      <RadioGroup
        className="gap-2"
        defaultValue={webhookNodes[0].webhookId}
        onValueChange={(value) => setSelectedValue(value)}
      >
        {workflows.map((workflow) => {
          const workflowName = workflow.name;
          const workflowId = workflow.id;

          const isActive = workflow.active;
          const webhookTriggerId =
            workflow.nodes.find(
              (node) => node.type === "n8n-nodes-base.webhook"
            )?.webhookId || "";
          return (
            <div
              key={workflowId}
              className="relative flex w-full items-start gap-2 rounded-lg border border-input p-4 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-ring"
            >
              <RadioGroupItem
                value={
                  workflow.nodes.find(
                    (node) => node.type === "n8n-nodes-base.webhook"
                  )?.webhookId || ""
                }
                disabled={!isActive}
                id={webhookTriggerId}
                aria-describedby={workflowName}
                className="order-1 after:absolute after:inset-0"
              />
              <div className="grid grow gap-2">
                <Label htmlFor={webhookTriggerId} className="text-lg font-bold">
                  {workflowName}{" "}
                  <span className="text-xs font-normal leading-[inherit] text-muted-foreground">
                    ({isActive ? "Active" : "Inactive"}){" "}
                  </span>
                  <span className="text-xs font-normal leading-[inherit] text-muted-foreground">
                    - ({webhookTriggerId})
                  </span>
                </Label>
                <p
                  id={`${workflowName}-description`}
                  className="text-xs text-muted-foreground"
                >
                  Tags: {workflow.tags.map((tag) => tag.name).join(", ")} |
                  Triggers: {workflow.triggerCount} | Nodes:{" "}
                  {workflow.nodes.length}
                </p>
              </div>
            </div>
          );
        })}
      </RadioGroup>
      <Button type="submit" disabled={!selectedValue || isLoading}>
        {isLoading ? "executing..." : "Execute Workflow"}
      </Button>
      {error ? (
        <div className="text-xs bg-red-100 text-red-700 w-full p-3 rounded-md border-red-200 border-2  flex flex-col gap-2">
          <span className="font-bold">Error executing workflow</span>
          <span>code: {error.code}</span> <span>message: {error.message}</span>
          <span>hint : {error.hint}</span>
        </div>
      ) : null}
      {isSuccess ? (
        <div className="text-xs bg-green-100 text-green-700 w-full p-3 rounded-md border-green-200 border-2 flex flex-col gap-2">
          <span className="font-bold">Workflow executed successfully</span>
        </div>
      ) : null}
    </form>
  );
}
