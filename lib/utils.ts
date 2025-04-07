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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function extractData(input: any): Summary {
  // If the input is already an object (not an array), return it directly
  if (input && typeof input === 'object' && !Array.isArray(input)) {
    return input as Summary;
  }
  
  // If it's an array, reduce it as before
  if (Array.isArray(input)) {
    return input.reduce((result, item) => {
      return { ...result, ...item };
    }, {} as Summary);
  }
  
  // Default case: return empty object
  return {} as Summary;
}
