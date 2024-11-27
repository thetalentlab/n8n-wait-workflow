import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getHeaders() {
  const headers = new Headers();
  headers.set("X-N8N-API-KEY", process.env.X_N8N_API_KEY!);
  headers.set("mode", "no-cors");
  return headers;
}

export function extractData(inputArray: any[]): Summary {
  return inputArray.reduce((result, item) => {
    return { ...result, ...item };
  }, {} as Summary);
}