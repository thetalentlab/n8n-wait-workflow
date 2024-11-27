"use server";
import { API_BASE_URL } from "@/lib/constants";

export async function getCurrentWaitNode(executionId: string) {
  const headers = new Headers();
  headers.set("X-N8N-API-KEY", process.env.X_N8N_API_KEY!);
  headers.set("mode", "no-cors");
  const res = await fetch(
    `${API_BASE_URL}/executions/${executionId}?includeData=true`,
    {
      headers,
    }
  );
  const metadata = (await res.json()) as WebhookExecutionMetadata;
  const lastNodeExecuted = metadata.data.resultData.lastNodeExecuted;
  const allNodes = metadata.workflowData.nodes;
  const currentWaitNode = allNodes.find(
    (node) =>
      node.name === lastNodeExecuted && node.type === "n8n-nodes-base.wait"
  );
  return currentWaitNode;
}

export async function getAllWaitNodes(executionId: string) {
  const headers = new Headers();
  headers.set("X-N8N-API-KEY", process.env.X_N8N_API_KEY!);
  headers.set("mode", "no-cors");

  const res = await fetch(
    `${API_BASE_URL}/executions/${executionId}?includeData=true`,
    {
      headers,
    }
  );
  const metadata = (await res.json()) as WebhookExecutionMetadata;
  const nodes = metadata.workflowData.nodes;
  const waitNodes = nodes.filter((node) => node.type === "n8n-nodes-base.wait");
  return waitNodes;
}
