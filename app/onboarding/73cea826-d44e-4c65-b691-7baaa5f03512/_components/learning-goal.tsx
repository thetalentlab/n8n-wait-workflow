import FormStatusButton from "@/components/loading-button";
import { Textarea } from "@/components/ui/textarea";

const examples = [
  "I want to learn SQL to analyze campaign performance data and make data-driven decisions to improve ROI.",
  "I am a computer science student who wants to strengthen my understanding of algorithms and data structures to prepare for technical interviews.",
  "I am senior software engineer in JavaScript and want to learn new programming language python.",
  "I am a technical recruiter and want to learn how to learn basic of programming languages starting off with Python.",
];

export default async function LearningGoal({
  handleNext,
}: {
  handleNext: (formdata: FormData) => void;
}) {
  return (
    <form action={handleNext} className="flex flex-col gap-4 max-w-2xl w-full">
      <Textarea name="learningGoal" placeholder="What do you want to learn?" />
      <FormStatusButton type="submit">Next</FormStatusButton>
      <div className="w-full max-w-xl self-start mt-6">
        <p className="font-bold">examples:</p>
        <div className="flex flex-col gap-2">
          {examples.map((example) => (
            <p key={example} className="text-xs p-4 border rounded-md">
              {example}
            </p>
          ))}
        </div>
      </div>
    </form>
  );
}
