"use server";

import { API_BASE_URL } from "@/lib/constants";
import { getHeaders } from "@/lib/utils";

export async function getAllTags() {
  const headers = getHeaders();
  const res = await fetch(`${API_BASE_URL}/tags`, { headers });
  const tags = await res.json();
  return tags;
}

export async function getTag(id: string) {
  const headers = getHeaders();
  const res = await fetch(`${API_BASE_URL}/tags/${id}`, { headers });
  const tag = (await res.json()) as WorkflowTag[];
  return tag;
}
