"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  // CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
// import { Edit } from "lucide-react";

export default function Summary({
  data,
  handleSubmit,
}: {
  data: GroqSummary;
  handleSubmit: (data: GroqSummary) => void;
}) {
  const onSubmit = async () => {
    handleSubmit(data);
  };
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-4 gap-4">
      {/* Title */}
      <Card className="border shadow-lg col-span-4">
        <CardHeader>
          {/* <CardTitle className="text-2xl font-semibold">
            <div className="flex items-center justify-between">
              <p>Course title</p>
              <Button variant="secondary" size="icon">
                <Edit className="text-secondary-foreground" />
              </Button>
            </div>
          </CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat,
            laborum.
          </CardDescription> */}
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-semibold">{data.courseTitle}</h2>
        </CardContent>
      </Card>

      {/* Learning Preferences */}
      <Card className="border shadow-lg col-span-4 lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            <div className="flex items-center justify-between">
              <p>Preferences</p>
              {/* <Button variant="secondary" size="icon">
                <Edit className="text-secondary-foreground" />
              </Button> */}
            </div>
          </CardTitle>
          {/* <CardDescription>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat,
            laborum.
          </CardDescription> */}
        </CardHeader>
        <CardContent>
          <ul className="flex gap-2 flex-wrap">
            {data.learningPreferences.map((preference) => (
              <li key={preference.label} className="flex items-center">
                <Badge variant="secondary">{preference.label} </Badge>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Learning Goal */}
      <Card className="border shadow-lg col-span-4 lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            <div className="flex items-center justify-between">
              <p>Goal</p>
              {/* <Button variant="secondary" size="icon">
                <Edit className="text-secondary-foreground" />
              </Button> */}
            </div>
          </CardTitle>
          {/* <CardDescription>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat,
            laborum.
          </CardDescription> */}
        </CardHeader>
        <CardContent>
          <p>{data.learningGoal}</p>
        </CardContent>
      </Card>

      {/* Selected Topics */}
      <Card className="border shadow-lg lg:col-span-2 col-span-4">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            <div className="flex items-center justify-between">
              <p>Topics</p>
              {/* <Button variant="secondary" size="icon">
                <Edit className="text-secondary-foreground" />
              </Button> */}
            </div>
          </CardTitle>
          {/* <CardDescription>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat,
            laborum.
          </CardDescription> */}
        </CardHeader>
        <CardContent>
          <div>
            <Badge variant="outline">Included</Badge>
            <ul className="list-disc pl-6">
              {data.topics.included.map((topic) => (
                <li key={topic.id} className="py-2">
                  {topic.content}
                </li>
              ))}
            </ul>
          </div>
          <div>
            {data.topics.excluded.length !== 0 && (
              <>
                <Badge variant="outline">Excluded</Badge>
                <ul className="list-disc pl-6">
                  {data.topics.excluded.map((topic) => (
                    <li key={topic.id} className="py-2">
                      {topic.content}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Selected Questions */}
      <Card className="border shadow-lg lg:col-span-2 col-span-4">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            <div className="flex items-center justify-between">
              <p>Questions</p>
              {/* <Button variant="secondary" size="icon">
                <Edit className="text-secondary-foreground" />
              </Button> */}
            </div>
          </CardTitle>
          {/* <CardDescription>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat,
            laborum.
          </CardDescription> */}
        </CardHeader>
        <CardContent>
          <ul className="list-decimal pl-6">
            {data.selectedQuestions.map((question, index) => (
              <li key={index} className="py-2">
                {question.content}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Time */}
      <Card className="border shadow-lg col-span-4">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            <div className="flex items-center justify-between">
              <p>Timing</p>
              {/* <Button variant="secondary" size="icon">
                <Edit className="text-secondary-foreground" />
              </Button> */}
            </div>
          </CardTitle>
          {/* <CardDescription>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat,
            laborum.
          </CardDescription> */}
        </CardHeader>
        <CardContent>
          <p>
            I want to learn for <strong>{data.time.duration}</strong> every{" "}
            <strong>{data.time.frequency}</strong>
          </p>
        </CardContent>
      </Card>
      <Button onClick={onSubmit} className="col-start-4">
        Confirm
      </Button>
    </div>
  );
}
