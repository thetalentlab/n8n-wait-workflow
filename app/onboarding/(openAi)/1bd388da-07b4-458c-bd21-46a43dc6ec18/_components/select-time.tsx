import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FormStatusButton from "@/components/loading-button";
import { Label } from "@/components/ui/label";

interface selectTimeProps {
  handleNext: (formData: FormData) => void;
}

export default function SelectTime({ handleNext }: selectTimeProps) {
  return (
    <form
      className="grid grid-cols-4 gap-6 w-full max-w-3xl"
      action={handleNext}
    >
      <div className="w-full flex flex-wrap gap-6 items-center col-span-4 mx-auto">
        <Label>I plan to dedicate</Label>
        <Select name="duration">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Duration</SelectLabel>
              <SelectItem value="10-15 minutes">10 to 15 minutes</SelectItem>
              <SelectItem value="20-30 minutes">20 to 30 minutes</SelectItem>
              <SelectItem value="1 hour">1 hour</SelectItem>
              <SelectItem value="2-3 hours">2 to 3 hours</SelectItem>
              <SelectItem value="4-6 hours">4 to 6 hours</SelectItem>
              <SelectItem value="6+ hours">more than 6 hours</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Label>to learning everyday</Label>
        <Select name="frequency">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>frequency</SelectLabel>
              <SelectItem value="day">Day</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <FormStatusButton className="col-start-4 col-span-1">
        Next
      </FormStatusButton>
    </form>
  );
}
