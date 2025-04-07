"use server";

import { API_BASE_URL, PROD_URL, TEST_URL } from "@/lib/constants";

export async function getCurrentExecution(
  id: string
): Promise<WebhookExecutionMetadata> {
  const headers = new Headers();
  headers.set("X-N8N-API-KEY", process.env.X_N8N_API_KEY!);
  headers.set("mode", "no-cors");

  const res = await fetch(`${API_BASE_URL}/executions/${id}?includeData=true`, {
    headers,
  });
  const metadata = (await res.json()) as WebhookExecutionMetadata;
  // console.dir(metadata.workflowData.nodes, { depth: null });
  return metadata;
}

export async function getWorkflowName(id: string) {
  try {
    const headers = new Headers();
    headers.set("X-N8N-API-KEY", process.env.X_N8N_API_KEY!);
    headers.set("mode", "no-cors");

    const res = await fetch(
      `${API_BASE_URL}/executions/${id}?includeData=true`,
      {
        headers,
      }
    );
    const metadata = await res.json();
    return metadata.workflowData.name;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export default async function exectuteWorkflow(webhookTriggerId: string) {
  const res = await fetch(`${PROD_URL}/${webhookTriggerId}`);
  // const res = await fetch(`${TEST_URL}/${webhookTriggerId}`); // For testing
  const data = await res.json();
  return data;
}
