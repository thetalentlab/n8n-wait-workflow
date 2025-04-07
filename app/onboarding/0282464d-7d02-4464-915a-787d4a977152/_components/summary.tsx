"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Edit, Check, ArrowRight } from "lucide-react";

// Neo-brutalist style wrapper component
function NeoBrutalistCard({
  className,
  title,
  children,
  color = "#ffe01b", // Default yellow color
  rotation = 0
}: {
  className?: string;
  title: string;
  children: React.ReactNode;
  color?: string;
  rotation?: number;
}) {
  return (
    <div
      className={`relative ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div
        className="absolute inset-0 rounded-lg border-2 border-black"
        style={{
          backgroundColor: color,
          transform: "translate(8px, 8px)",
          zIndex: -1
        }}
      />
      <div className="bg-white border-2 border-black rounded-lg shadow-lg overflow-hidden">
        <div className="px-4 py-3 bg-gray-800 text-white font-thin flex justify-between items-center">
          <h3 className="text-md uppercase tracking-tight">{title}</h3>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function Summary({
  data,
  handleSubmit,
}: {
  data: Summary;
  handleSubmit: (data: Summary) => void;
}) {
  const onSubmit = () => {
    // Use a timeout to avoid state updates during render
    setTimeout(() => {
      handleSubmit(data);
    }, 0);
  };

  // Define a color palette for neo-brutalist style
  const colors = {
    yellow: "#ffe01b",
    blue: "#87CEEB",
    pink: "#ff90e8",
    green: "#A7F0BA",
    orange: "#FF8C42"
  };

  return (
    <div className="relative py-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {/* Title */}
        <NeoBrutalistCard
          title="COURSE TITLE"
          className="col-span-1 md:col-span-2"
          color={colors.yellow}
        >
          <h1 className="text-3xl font-black">{data.courseTitle}</h1>
        </NeoBrutalistCard>

        {/* Learning Preferences */}
        <NeoBrutalistCard
          title="LEARNING PREFERENCES"
          color={colors.pink}
        >
          <div className="flex flex-wrap gap-3">
            {Array.isArray(data.learningPreferences) && data.learningPreferences.map((preference, index) => (
              <span
                key={index}
                className="inline-block bg-gray-500 text-white px-4 py-2 rounded-full font-bold text-lg"
              >
                {typeof preference === 'string' ? preference : preference.label}
              </span>
            ))}
          </div>
        </NeoBrutalistCard>

        {/* Learning Goal */}
        <NeoBrutalistCard
          title="I WANT TO LEARN"
          color={colors.blue}

        >
          <p className="text-2xl font-bold">{data.learningGoal}</p>
        </NeoBrutalistCard>

        {/* Selected Topics */}
        <NeoBrutalistCard
          title="TOPICS"
          color={colors.green}

        >
          <ul className="space-y-3">
            {data.topics && data.topics.included && data.topics.included.map((topic, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="inline-block bg-gray-500 text-white text-lg rounded w-7 h-7 flex items-center justify-center font-bold shrink-0">{idx + 1}</span>
                <span className="font-thin text-lg ">
                  { topic }
                </span>
              </li>
            ))}
          </ul>
        </NeoBrutalistCard>

        {/* Selected Questions */}
        <NeoBrutalistCard
          title="QUESTIONS"
          color={colors.orange}

        >
          <ul className="space-y-4">
            {data.selectedQuestions && data.selectedQuestions.map((question, idx ) => (
              <li key={idx} className="border-b-2 border-black pb-2 last:border-b-0">
                <div className="flex items-start gap-3">
                  <span className="inline-block bg-gray-500 text-white text-lg rounded w-7 h-7 flex items-center justify-center font-bold shrink-0">{idx + 1}</span>
                  <span className="font-medium ">{question}</span>
                </div>
              </li>
            ))}
          </ul>
        </NeoBrutalistCard>

        {/* Time */}
        <NeoBrutalistCard
          title="TIME COMMITMENT"
          className="col-span-1 md:col-span-2"
          color={colors.yellow}

        >
          <div className="text-center">
            <p className="text-3xl font-black">
              {data.time}
            </p>
          </div>
        </NeoBrutalistCard>
      </div>
    </div>
  );
}
