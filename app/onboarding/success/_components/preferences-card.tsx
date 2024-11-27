import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function PreferencesCard({ summary }: { summary: Summary }) {
  return (
    <Card className="w-full mx-auto mt-8 bg-white/50 backdrop-blur-sm border-success/20">
      <CardHeader className="pb-3">
        <h3 className="text-lg font-medium text-gray-700">
          Here's a quick recap of your transformation preferences
        </h3>
      </CardHeader>
      <CardContent className="text-left space-y-3">
        <div className="space-y-1">
          <p className="text font-bold text-gray-500">Course Title</p>
          <p className="text-sm text-gray-700">{summary.courseTitle}</p>
        </div>
        <div className="space-y-1">
          <p className="text font-bold text-gray-500">Learning Goal</p>
          <p className="text-sm text-gray-700">{summary.learningGoal}</p>
        </div>
        <div className="space-y-1">
          <p className="text font-bold text-gray-500">Time Commitment</p>
          <p className="text-sm text-gray-700">
            {summary.time.duration} per {summary.time.frequency}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text font-bold text-gray-500">Topics</p>
          <p className="text-sm text-gray-700">
            {summary.topics.included.map((topic) => topic.content).join(", ")}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
