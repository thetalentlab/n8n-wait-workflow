"use server";

import { API_BASE_URL } from "@/lib/constants";
import { getHeaders } from "@/lib/utils";

export async function getAllWorkflows() {
  const headers = getHeaders();
  const res = await fetch(`${API_BASE_URL}/workflows`, { headers });
  const workflows = await res.json();
  return workflows;
}

export async function getWorkflowsByTagName(tagName: string) {
  const headers = getHeaders();
  const res = await fetch(`${API_BASE_URL}/workflows?tags=${tagName}`, {
    headers,
  });
  const workflows = (await res.json()).data as Workflow[];
  return workflows;
}

export async function getWorkflowsByName(name: string) {
  const headers = getHeaders();
  const nameQuery = new URLSearchParams(`name=${encodeURIComponent(name)}`);
  const res = await fetch(`${API_BASE_URL}/workflows?name=${nameQuery}`, {
    headers,
  });
  const workflows = (await res.json()).data as Workflow[];
  return workflows;
}

export async function getWorkflowById(id: string) {
  const headers = getHeaders();
  const res = await fetch(`${API_BASE_URL}/workflows/${id}`, { headers });
  const workflow = (await res.json()) as Workflow;
  return workflow;
}
