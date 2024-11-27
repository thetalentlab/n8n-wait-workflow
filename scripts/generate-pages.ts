import * as fs from "fs";
import * as path from "path";
import inquirer from "inquirer";
import { API_BASE_URL } from "@/lib/constants";

const headers = new Headers();
headers.set("X-N8N-API-KEY", process.env.X_N8N_API_KEY!);
headers.set("mode", "no-cors");
headers.set("Content-Type", "application/json");
headers.set("Accept", "application/json");

async function getAllWorkflows() {
  const res = await fetch(`${API_BASE_URL}/workflows`, { headers });
  const workflows = await res.json();
  return workflows.data;
}

async function selectWorkflow(workflows: Workflow[]) {
  try {
    const answers = await inquirer.prompt([
      {
        type: "select",
        name: "workflowName",
        message: "Select a workflow:",
        choices: workflows.map(
          (workflow) =>
            `${workflow.name} - (${workflow.active ? "Active" : "Inactive"})`
        ),
      },
    ]);
    const name = answers.workflowName;
    const selectedWorkflow = workflows.find(
      (workflow) => workflow.name === name.split(" - ")[0]
    );
    console.log("workflow id:", selectedWorkflow?.id);
    if (!selectedWorkflow?.active) {
      const yesNo = await inquirer.prompt([
        {
          type: "confirm",
          name: "confirm",
          message: "This workflow is inactive. Do you want to activate it?",
          default: false,
        },
      ]);
      if (yesNo.confirm) {
        const res = await fetch(
          `${API_BASE_URL}/workflows/${selectedWorkflow?.id}/activate`,
          { headers, method: "POST" }
        );
        const workflow = await res.json();
        console.log("workflow activated", workflow);
        return workflow;
      }
    }
    if (name) {
      const selectedWorkflow = workflows.find(
        (workflow) => workflow.name === name.split(" - ")[0]
      );
      console.log("selectedWorkflow", selectedWorkflow);
      return selectedWorkflow;
    }
  } catch (error) {
    console.log(error);
  }
}

function sanitizeName(name: string) {
  const nameArray = name
    .replace(/^[0-9_.-]+/, "")
    .replace(/[_.-]/g, "")
    .replace(/(?:^|\s)\S/g, (a) => a.toUpperCase())
    .split(" ");

  nameArray.forEach((word) => word.charAt(0).toUpperCase());
  const newName = nameArray.join("");
  return newName;
}

async function generatePages(waitNodes: Node[]) {
  waitNodes.forEach(async (waitNode) => {
    const folderName = waitNode.id;
    const name = sanitizeName(waitNode.name);
    const pageName = name + "Page";
    const folderPath = path.join(__dirname, `../app/onboarding/${folderName}`);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
    try {
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
      }
    } catch (error) {
      console.error(error);
    }
    const filePath = path.join(folderPath, "page.tsx");
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(
        filePath,
        `import WorkflowStepsTimeline from "@/components/workflow-steps-timeline";

        export default function ${pageName}() {
          return (
            <div className="flex flex-col gap-4 items-center justify-center">
              <h1 className="text-4xl font-semibold">${pageName}</h1>
              <WorkflowStepsTimeline />
            </div>
          );
        }`
      );
    }
    console.log("✅ Page generated:", filePath);
  });
}

async function main() {
  const workflows = await getAllWorkflows();
  console.log(workflows);
  const selectedWorkflow = await selectWorkflow(workflows);
  const waitNodes = selectedWorkflow?.nodes.filter(
    (node: Node) => node.type === "n8n-nodes-base.wait"
  );
  if (!waitNodes?.length) {
    console.log("No wait nodes found");
    return;
  } else {
    generatePages(waitNodes);
  }
}

main();
