/* eslint-disable @typescript-eslint/no-explicit-any */
interface WebhookExecutionMetadata {
  id: string;
  finished: boolean;
  mode: string;
  retryOf: string | null;
  retrySuccessId: string | null;
  status: string;
  createdAt: string;
  startedAt: string;
  stoppedAt: string;
  deletedAt: string | null;
  workflowId: string;
  waitTill: string | null;
  data: {
    startData: Record<string, unknown>;
    resultData: {
      runData: Record<
        string,
        {
          hints: unknown[];
          startTime: number;
          executionTime: number;
          source: unknown[];
          executionStatus: string;
          data: {
            main: {
              json: {
                headers: Record<string, string>;
                params: Record<string, unknown>;
                query: Record<string, unknown>;
                body: Record<string, unknown>;
                webhookUrl: string;
                executionMode: string;
              };
              pairedItem: {
                item: number;
              };
            }[][];
          };
        }[]
      >;
      lastNodeExecuted: string;
    };
    executionData: {
      contextData: Record<string, unknown>;
      nodeExecutionStack: unknown[];
      waitingExecution: Record<string, unknown>;
    };
  };
  workflowData: {
    id: string;
    name: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
    nodes: {
      parameters: Record<string, unknown>;
      id: string;
      name: string;
      type: string;
      typeVersion: number;
      position: [number, number];
      webhookId?: string;
    }[];
    connections: Record<
      string,
      { main: { node: string; type: string; index: number }[][] }
    >;
    settings: Record<string, unknown>;
    staticData: Record<string, unknown>;
    pinData: Record<string, unknown>;
  };
  customData: Record<string, unknown>;
}

interface WorkflowTag {
  createdAt: string;
  updatedAt: string;
  id: string;
  name: string;
}

interface Node {
  parameters: Record<string, any>;
  id: string;
  name: string;
  type: string;
  typeVersion: number;
  position: [number, number];
  webhookId?: string;
}

interface Connection {
  main: Array<Array<{ node: string; type: string; index: number }>>;
}

interface Settings {
  executionOrder: string;
}

interface Workflow {
  createdAt: string;
  updatedAt: string;
  id: string;
  name: string;
  active: boolean;
  nodes: Node[];
  connections: Record<string, Connection>;
  settings: Settings;
  staticData: any;
  meta: any;
  pinData: Record<string, any>;
  versionId: string;
  triggerCount: number;
  tags: Tag[];
}

interface Preference {
  id: number;
  label: string;
  icon: JSX.Element;
  metadata: string;
}

type Topic = {
  id: string;
  content: string;
};

type Time = {
  duration: string;
  frequency: string;
};

type LearningPreference = {
  id: number;
  label: string;
  icon: Record<string, unknown>; // or specific type if you know the structure of the icon
  metadata: string;
};

type Summary = {
  courseTitle: string;
  time: Time;
  selectedQuestions: string[];
  topics: {
    excluded: Topic[];
    included: Topic[];
    rest: Topic[];
  };
  learningGoal: string;
  learningPreferences: LearningPreference[];
};
