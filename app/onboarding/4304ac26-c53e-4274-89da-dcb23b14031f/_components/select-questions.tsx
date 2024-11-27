import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import FormStatusButton from "@/components/loading-button";

type Question = {
  id: string;
  text: string;
};
interface SelectQuestionsProps {
  questions: Question[];
  handleNext: (formData: FormData) => void;
}

export default function SelectQuestions({
  questions,
  handleNext,
}: SelectQuestionsProps) {
  return (
    <form className="flex flex-col gap-2" action={handleNext}>
      {questions.map(({ text, id }) => (
        <div
          key={id}
          className="flex items-center gap-4 cursor-pointer p-1 max-w-2xl"
        >
          <Checkbox id={id} name="question" value={text} className="h-6 w-6" />
          <Label className="cursor-pointer text-lg" htmlFor={id}>
            {text}
          </Label>
        </div>
      ))}
      <FormStatusButton>Next</FormStatusButton>
    </form>
  );
}
