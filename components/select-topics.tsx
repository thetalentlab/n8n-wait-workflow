"use client";
import React, { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { GripVertical, ChevronRight, Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import { Button } from "./ui/button";
import { setCoockie } from "@/lib/cookies";

interface ItemType {
  id: number | string;
  name: string;
}

interface SelectTopicsProps {
  topics: ItemType[];
  handleNext: (topics: any) => void;
}

const SelectTopics: React.FC<SelectTopicsProps> = ({
  topics: initialTopics,
  handleNext,
}) => {
  const [topics, setTopics] = useState<ItemType[]>(initialTopics);
  const [includedTopics, setIncludedTopics] = useState<ItemType[]>([]);
  const [excludedTopics, setExcludedTopics] = useState<ItemType[]>([]);
  const [topicInputValue, setTopicInputValue] = useState("");
  const [draggingTopic, setDraggingTopic] = useState<string | null>(null);
  const [draggingType, setDraggingType] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const addTopicFromInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && topicInputValue.trim()) {
      setTopics((prev) => [
        ...prev,
        { id: Date.now(), name: topicInputValue.trim() },
      ]);
      setTopicInputValue("");
    }
  };

  const handleDragStart = (e: React.DragEvent, type: string, topic: string) => {
    e.dataTransfer.effectAllowed = "move";
    setDraggingTopic(topic);
    setDraggingType(type);
  };

  const handleDrop = (targetType: string) => {
    if (!draggingTopic || !draggingType) return;

    const updateList = (
      list: ItemType[],
      target: ItemType[],
      topic: string
    ) => {
      const filteredSource = list.filter((item) => item.name !== topic);
      const updatedTarget = [...target, { id: Date.now(), name: topic.trim() }];
      return { filteredSource, updatedTarget };
    };

    if (draggingType === "topics") {
      const { filteredSource, updatedTarget } =
        targetType === "included"
          ? updateList(topics, includedTopics, draggingTopic)
          : updateList(topics, excludedTopics, draggingTopic);
      setTopics(filteredSource);
      targetType === "included"
        ? setIncludedTopics(updatedTarget)
        : setExcludedTopics(updatedTarget);
    } else if (draggingType === "included") {
      const { filteredSource, updatedTarget } =
        targetType === "topics"
          ? updateList(includedTopics, topics, draggingTopic)
          : updateList(includedTopics, excludedTopics, draggingTopic);
      setIncludedTopics(filteredSource);
      targetType === "topics"
        ? setTopics(updatedTarget)
        : setExcludedTopics(updatedTarget);
    } else if (draggingType === "excluded") {
      const { filteredSource, updatedTarget } =
        targetType === "topics"
          ? updateList(excludedTopics, topics, draggingTopic)
          : updateList(excludedTopics, includedTopics, draggingTopic);
      setExcludedTopics(filteredSource);
      targetType === "topics"
        ? setTopics(updatedTarget)
        : setIncludedTopics(updatedTarget);
    }

    setDraggingTopic(null);
    setDraggingType(null);
  };

  const handleContinue = async () => {
    setLoading(true);
    await handleNext(includedTopics);
    setLoading(false);
  };

  if (topics.length === 0) {
    return (
      <div className="text-center">
        <p>No topics found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="text-center">
        <h1 className="text-3xl font-semibold">Sort Your Topics</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Drag and drop topics to sort them
        </p>

        <div className="mt-6 grid lg:grid-cols-3 gap-4">
          {/* Excluded Topics */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop("excluded")}
            className="flex-1 rounded-2xl border-2 border-red-400/30 bg-red-50 p-5"
          >
            <h2 className="mb-5 text-xl font-semibold text-red-500">
              Excluded
            </h2>
            <ReactSortable
              list={excludedTopics}
              setList={setExcludedTopics}
              className="flex flex-col gap-4"
              animation={150}
            >
              {excludedTopics.map((item) => (
                <div
                  draggable
                  onDragStart={(e) => handleDragStart(e, "excluded", item.name)}
                  className="flex items-center gap-2 rounded-lg border p-3"
                  key={item.id}
                >
                  <GripVertical className="opacity-50" />
                  <div className="grow">{item.name}</div>
                </div>
              ))}
            </ReactSortable>
          </div>

          {/* Topics */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop("topics")}
            className="flex-1 flex flex-col gap-6"
          >
            <input
              value={topicInputValue}
              onChange={(e) => setTopicInputValue(e.target.value)}
              onKeyDown={addTopicFromInput}
              placeholder="Add your own topic"
              className="mb-6 w-full rounded-lg border p-3"
            />
            <ReactSortable
              list={topics}
              setList={setTopics}
              className="flex flex-col gap-4"
              animation={150}
            >
              {topics.map((item) => (
                <div
                  draggable
                  onDragStart={(e) => handleDragStart(e, "topics", item.name)}
                  className="flex items-center gap-2 rounded-lg border p-3"
                  key={item.id}
                >
                  <GripVertical className="opacity-50" />
                  <div className="grow">{item.name}</div>
                </div>
              ))}
            </ReactSortable>
          </div>

          {/* Included Topics */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop("included")}
            className="flex-1 rounded-2xl border-2 border-green-500/30 bg-green-50 p-5"
          >
            <h2 className="mb-5 text-xl font-semibold text-green-500">
              Included
            </h2>
            <ReactSortable
              list={includedTopics}
              setList={setIncludedTopics}
              className="flex flex-col gap-4"
              animation={150}
            >
              {includedTopics.map((item) => (
                <div
                  draggable
                  onDragStart={(e) => handleDragStart(e, "included", item.name)}
                  className="flex items-center gap-2 rounded-lg border p-3"
                  key={item.id}
                >
                  <GripVertical className="opacity-50" />
                  <div className="grow">{item.name}</div>
                </div>
              ))}
            </ReactSortable>
          </div>
        </div>
      </div>
      <Button
        onClick={handleContinue}
        disabled={loading || !includedTopics.length}
        className="flex items-center gap-2"
      >
        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Next"}
      </Button>
    </div>
  );
};

export default SelectTopics;
