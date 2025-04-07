"use server";

// This is a temporary debug file to help diagnose the API issues
// Import the necessary functions and constants
import { getWorkflowsByTagName } from "./actions/workflow";
import { API_BASE_URL } from "./lib/constants";
import { getHeaders } from "./lib/utils";

export async function debugAPI() {
  console.log("API_BASE_URL:", API_BASE_URL);
  console.log("Headers:", {
    "X-N8N-API-KEY": process.env.X_N8N_API_KEY ? "Set (masked)" : "Not set",
  });
  
  try {
    // Try to fetch workflows
    const tagName = "flashclass";
    console.log(`Fetching workflows with tag: ${tagName}`);
    
    // Test direct fetch first
    const headers = getHeaders();
    console.log(`Making direct fetch to: ${API_BASE_URL}/workflows?tags=${tagName}`);
    const directRes = await fetch(`${API_BASE_URL}/workflows?tags=${tagName}`, {
      headers,
    });
    
    console.log("Response status:", directRes.status);
    console.log("Response headers:", Object.fromEntries([...directRes.headers.entries()]));
    
    const responseText = await directRes.text();
    console.log("Raw response text:", responseText);
    
    let responseData;
    try {
      responseData = JSON.parse(responseText);
      console.log("Parsed response data:", responseData);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
    }
    
    // Now try the actual function
    console.log("Trying getWorkflowsByTagName function...");
    const workflows = await getWorkflowsByTagName(tagName);
    console.log("Workflows returned:", workflows);
    console.log("Workflows is array:", Array.isArray(workflows));
    console.log("Workflows length:", workflows ? workflows.length : "N/A");
    
    return {
      success: true,
      message: "Debug complete",
      details: {
        apiBaseUrl: API_BASE_URL,
        hasApiKey: !!process.env.X_N8N_API_KEY,
        responseStatus: directRes.status,
        responseData: responseData,
        workflowsFromFunction: workflows,
      }
    };
  } catch (error) {
    console.error("Debug API Error:", error);
    return {
      success: false,
      message: "Error during debugging",
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
      }
    };
  }
}
