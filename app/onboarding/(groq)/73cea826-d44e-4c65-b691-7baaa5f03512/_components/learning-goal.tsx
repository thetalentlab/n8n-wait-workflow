import FormStatusButton from "@/components/loading-button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

const examples = [
  "I want to learn SQL to analyze campaign performance data and make data-driven decisions to improve ROI.",
  "I am a computer science student who wants to strengthen my understanding of algorithms and data structures to prepare for technical interviews.",
  "I am senior software engineer in JavaScript and want to learn new programming language python.",
  "I am a technical recruiter and want to learn how to learn basic of programming languages starting off with Python.",
];

const learningGoals = [
  {
    role: "Data Analyst",
    goal: "I want to learn advanced data visualization techniques in Tableau to present insights effectively to stakeholders.",
  },
  {
    role: "DevOps Engineer",
    goal: "I want to deepen my knowledge of Kubernetes for orchestrating scalable containerized applications.",
  },
  {
    role: "Marketing Manager",
    goal: "I want to learn A/B testing strategies to optimize our digital campaigns and improve customer conversion rates.",
  },
  {
    role: "Operations Manager",
    goal: "I want to learn Lean Six Sigma principles to streamline our workflows and improve efficiency.",
  },
  {
    role: "CEO",
    goal: "I want to learn about emerging technologies like AI and blockchain to identify strategic opportunities for innovation.",
  },
  {
    role: "CFO",
    goal: "I aim to learn advanced Excel modeling techniques to improve financial forecasting and budgeting.",
  },
  {
    role: "Graphic Designer",
    goal: "I want to learn motion graphics design in After Effects to expand my skill set for video projects.",
  },
  {
    role: "Content Writer",
    goal: "I aim to improve my SEO writing skills to create content that ranks higher in search engines.",
  },
];

export default async function LearningGoal({
  handleNext,
}: {
  handleNext: (formdata: FormData) => void;
}) {
  return (
    <form action={handleNext} className="flex flex-col gap-4 max-w-2xl w-full">
      <Textarea
        name="learningGoal"
        rows={5}
        placeholder="Please share your current learning goal and include relevant details about why you want to reach this goal as well as a few words about your current role or experience"
      />
      <FormStatusButton type="submit">Next</FormStatusButton>
      <div className="w-full max-w-xl self-start mt-6">
        <p className="font-bold mb-2">Examples:</p>
        <div className="flex flex-col gap-2">
          {learningGoals
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
            .map((example) => (
              <div className="flex flex-col gap-2 items-start p-4 border rounded-md">
                <Badge variant="outline">{example.role}</Badge>
                <p key={example.role} className="text-xs pl-3">
                  {example.goal}
                </p>
              </div>
            ))}
        </div>
      </div>
    </form>
  );
}
