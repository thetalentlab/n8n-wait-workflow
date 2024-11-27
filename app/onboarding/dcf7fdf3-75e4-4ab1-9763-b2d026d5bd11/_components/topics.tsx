"use client";
import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Column } from "./column";
import { TopicCard } from "./topic-card";
import { Loader2 } from "lucide-react";

interface Topic {
  id: string;
  content: string;
}

const mockTopics: Topic[] = [
  {
    id: "b1c1a3f8-882f-46f2-b4a7-35e29851fbf8",
    content: "Introduction to Next.js for Beginners",
  },
  {
    id: "f8d01d3f-9915-4866-8cab-1cf7d73e9318",
    content: "Building Server-Side Rendered Applications with Next.js",
  },
  {
    id: "3d3c8173-73a6-4d81-b5a5-6595f7550fbc",
    content: "Static Site Generation in Next.js",
  },
  {
    id: "7e8a511f-e73a-4e1d-bf57-a527d9bf9ebc",
    content: "Creating and Managing Pages in Next.js",
  },
  {
    id: "0ffb1fa1-f8ef-4fbd-82f4-ca928610d9e7",
    content: "API Routes and Data Fetching in Next.js",
  },
  {
    id: "4f1aa4c6-3ab6-48cc-af34-9d940ee4c63d",
    content: "Optimizing Performance in Next.js Applications",
  },
  {
    id: "e9a8a573-655a-4de6-bdb1-b748e34ac289",
    content: "Next.js Routing and Dynamic Routing",
  },
  {
    id: "9d6972f9-76fc-4185-8d42-8d563752cc70",
    content: "Integrating CSS and Styling in Next.js",
  },
  {
    id: "d55f2e73-b29c-40e6-8071-9229b257d63d",
    content: "Deployment Strategies for Next.js Applications",
  },
  {
    id: "40c84c63-0c5e-4f91-bc68-c6b709e19f06",
    content: "Best Practices and Common Pitfalls in Next.js Development",
  },
];

const Topics = ({
  initialTopics,
  handleNext,
}: {
  initialTopics: Topic[];
  handleNext: (topics: any) => Promise<void | { error: string }>;
}) => {
  const [topics, setTopics] = useState<Topic[]>(initialTopics);
  const [excludedTopics, setExcludedTopics] = useState<Topic[]>([]);
  const [includedTopics, setIncludedTopics] = useState<Topic[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [newTopic, setNewTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    console.log(over);
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    // Handle sorting within the same list
    const getList = (id: string) => {
      if (id.startsWith("excluded")) return excludedTopics;
      if (id.startsWith("included")) return includedTopics;
      return topics;
    };

    const getSetList = (id: string) => {
      if (id.startsWith("excluded")) return setExcludedTopics;
      if (id.startsWith("included")) return setIncludedTopics;
      return setTopics;
    };

    const activeList = getList(activeId as string);
    const overList = getList(overId as string);

    if (activeList === overList) {
      const oldIndex = activeList.findIndex((t) => t.id === activeId);
      const newIndex = activeList.findIndex((t) => t.id === overId);

      const newOrder = arrayMove(activeList, oldIndex, newIndex);
      getSetList(activeId as string)(newOrder);
    } else {
      // Handle moving between lists
      const topic = [...topics, ...excludedTopics, ...includedTopics].find(
        (t) => t.id === activeId
      );

      if (!topic) return;

      // Remove from old list
      if (activeList === topics) {
        setTopics(topics.filter((t) => t.id !== activeId));
      } else if (activeList === excludedTopics) {
        setExcludedTopics(excludedTopics.filter((t) => t.id !== activeId));
      } else {
        setIncludedTopics(includedTopics.filter((t) => t.id !== activeId));
      }

      // Add to new list
      if (overList === topics) {
        setTopics([...topics, topic]);
      } else if (overList === excludedTopics) {
        setExcludedTopics([...excludedTopics, topic]);
      } else {
        setIncludedTopics([...includedTopics, topic]);
      }
    }

    setActiveId(null);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const res = await handleNext({
      excluded: excludedTopics,
      included: includedTopics,
      rest: topics,
    });
    if (res?.error) {
      console.log(res.error);
      return;
    }
    setIsLoading(false);
  };

  const handleAddTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopic.trim()) return;

    const topic: Topic = {
      id: Date.now().toString(),
      content: newTopic.trim(),
    };

    setTopics([...topics, topic]);
    setNewTopic("");
    // toast.success("Topic added successfully!");
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8">
      <form
        onSubmit={handleAddTopic}
        className="max-w-lg w-full mx-auto flex flex-wrap gap-2 "
      >
        <Input
          value={newTopic}
          onChange={(e) => setNewTopic(e.target.value)}
          placeholder="Add a new topic..."
          className="flex-1"
        />
        <Button type="submit" variant="outline" className="w-1/5">
          Add
        </Button>
      </form>

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Column
            id="excluded"
            title="Exclude"
            items={excludedTopics}
            variant="exclude"
          />
          <Column id="topics" items={topics} variant="neutral" />
          <Column
            id="included"
            title="Include"
            items={includedTopics}
            variant="include"
          />
        </div>

        <DragOverlay>
          {activeId ? (
            <TopicCard
              topic={
                [...topics, ...excludedTopics, ...includedTopics].find(
                  (t) => t.id === activeId
                )!
              }
            />
          ) : null}
        </DragOverlay>
      </DndContext>

      <Button
        onClick={handleSubmit}
        size="lg"
        className="px-8 self-end w-1/3"
        disabled={isLoading}
      >
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Next"}
      </Button>
    </div>
  );
};

export default Topics;
