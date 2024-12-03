/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
// import { LiaArrowRightSolid } from 'react-icons/lia';
// import { MdDragIndicator } from 'react-icons/md';
import { GripVertical, Loader2 } from "lucide-react";
import { ReactSortable } from "react-sortablejs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";

type ResponseError = {
  message: string;
  statusText: string;
  status: number;
};

interface Props {
  initialTopics: Topic[];
  handleNext: (topics: SortedTopics) => Promise<void | ResponseError>;
}

const SortTopics = ({ handleNext, initialTopics }: Props) => {
  const [topics, setTopics] = useState<Topic[]>(initialTopics);
  const [topicInputValue, setTopicInputValue] = useState("");

  const [draggingTopic, setDraggingTopic] = useState("");
  const [draggingType, setDraggingType] = useState("");
  const [showNumbers, setShowNumbers] = useState(false);
  const [highlightedTopic, setHighlightedTopic] = useState<string | null>(null);
  const [includedTopics, setIncludedTopics] = useState<Topic[]>([]);
  const [excludedTopics, setExcludedTopics] = useState<Topic[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ResponseError | null>(null);
  const addFromInput = (e: any) => {
    if (e.key !== "Enter") {
      return;
    }
    if (e.key === "Enter" && topicInputValue) {
      const transformedTopics = topics.map((topic) => topic.content);
      const transformedIncludedTopics = includedTopics.map(
        (topic) => topic.content
      );
      const transformedExcludedTopics = excludedTopics.map(
        (topic) => topic.content
      );

      const lowerCaseInputTopic = topicInputValue.trim().toLowerCase();
      if (
        transformedTopics
          .map((item) => item.toLowerCase())
          .includes(lowerCaseInputTopic) ||
        transformedIncludedTopics
          .map((item) => item.toLowerCase())
          .includes(lowerCaseInputTopic) ||
        transformedExcludedTopics
          .map((item) => item.toLowerCase())
          .includes(lowerCaseInputTopic)
      ) {
        setHighlightedTopic(lowerCaseInputTopic);
        setTimeout(() => setHighlightedTopic(null), 1000);
        return;
      }
      const newTopicsList = [
        { id: uuidv4(), content: topicInputValue.trim() },
        ...topics,
      ];
      setTopics(newTopicsList);
      setTopicInputValue("");
    }
  };

  function drag(e: any, type: string) {
    let text = e.target.textContent;
    if (/\d$/.test(text) && type === "included") {
      text = text.slice(0, -1);
    }
    setDraggingTopic(text);
    setDraggingType(type);
  }

  const handleShowNumbers = () => {
    setShowNumbers(true);
    setTimeout(() => setShowNumbers(false), 2000);
  };

  function dropTopics(e: any) {
    e.preventDefault();
    const transformedTopics = topics.map((topic) => topic.content);
    if (!draggingTopic.length || transformedTopics.includes(draggingTopic))
      return;
    const newTopicsToInclude = [
      ...topics,
      { id: draggingTopic.trim(), content: draggingTopic.trim() },
    ];
    setTopics(newTopicsToInclude);
    if (draggingType === "included") {
      const newTopics = includedTopics.filter((topic) => {
        return topic.content !== draggingTopic;
      });
      setIncludedTopics(newTopics);
    } else if (draggingType === "excluded") {
      const newTopics = excludedTopics.filter((topic) => {
        return topic.content !== draggingTopic;
      });
      setExcludedTopics(newTopics);
    }
    setDraggingTopic("");
  }

  function dropIncludedTopics(e: any) {
    e.preventDefault();
    const transformedIncludedTopics = includedTopics.map(
      (topic) => topic.content
    );
    if (
      !draggingTopic.length ||
      transformedIncludedTopics.includes(draggingTopic)
    )
      return;
    const newTopicsToInclude = [
      ...includedTopics,
      { id: draggingTopic.trim(), content: draggingTopic.trim() },
    ];
    setIncludedTopics(newTopicsToInclude);

    if (draggingType === "topics") {
      const newTopics = topics.filter((topic) => {
        return topic.content !== draggingTopic;
      });
      setTopics(newTopics);
    } else if (draggingType === "excluded") {
      const newTopics = excludedTopics.filter((topic) => {
        return topic.content !== draggingTopic;
      });
      setExcludedTopics(newTopics);
    }
    setDraggingTopic("");
  }

  function dropExcludedTopics(e: any) {
    e.preventDefault();
    const transformedExcludedTopics = excludedTopics.map(
      (topic) => topic.content
    );
    if (
      !draggingTopic.length ||
      transformedExcludedTopics.includes(draggingTopic)
    )
      return;
    const newTopicsToExclude = [
      ...excludedTopics,
      { id: draggingTopic.trim(), content: draggingTopic.trim() },
    ];
    setExcludedTopics(newTopicsToExclude);

    if (draggingType === "topics") {
      const newTopics = topics.filter((topic) => {
        return topic.content !== draggingTopic;
      });
      setTopics(newTopics);
    } else if (draggingType === "included") {
      const newTopics = includedTopics.filter((topic) => {
        return topic.content !== draggingTopic;
      });
      setIncludedTopics(newTopics);
    }
    setDraggingTopic("");
  }

  const onDrag = (e: any) => {
    const event = e as Event;
    event.stopPropagation();
    event.preventDefault();
  };

  const handleSubmit = async () => {
    setLoading(true);
    const res = await handleNext({
      excluded: excludedTopics,
      included: includedTopics,
      rest: topics,
    });
    if (res?.message) {
      setError(res);
      setLoading(false);
      return;
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col px-24 py-14 ">
      <div className="gap-3 text-center">
        <h1 className="text-3xl font-semibold sm:text-3xl md:text-4xl">
          Sort Topics
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">Drag and Drop</p>
      </div>
      <div className="my-10 grid w-full grid-cols-1 justify-center gap-8 lg:grid-cols-3">
        {/* Excluded Topics */}
        <div
          onDragOver={(e) => onDrag(e)}
          onDragEnter={(e) => onDrag(e)}
          onDrop={(e) => dropExcludedTopics(e)}
          className="relative size-full rounded-2xl border-[3px] border-red-400/30 
              bg-red-400/5 p-5 col-span-3 lg:col-span-1"
        >
          <h2 className="mb-5 text-xl font-semibold text-red-500/90">
            Excluded
          </h2>
          <ReactSortable
            list={excludedTopics}
            setList={setExcludedTopics}
            className="mb-16 flex min-h-40 flex-col gap-4"
            animation={150}
            chosenClass=""
          >
            {excludedTopics.map((item, index) => (
              <div
                draggable
                onDragStart={(event) => drag(event, "excluded")}
                className={`shadow-sm border-black/15 flex cursor-pointer items-center gap-2 rounded-lg border p-3 transition hover:scale-105 
                  ${
                    highlightedTopic === item.content.toLowerCase()
                      ? "animate-pulse bg-gray-400 text-white"
                      : "bg-secondary"
                  }`}
                // eslint-disable-next-line react/no-array-index-key
                key={index}
              >
                <GripVertical
                  size={24}
                  className="w-8 shrink-0 text-left opacity-25"
                  style={{ minWidth: "24px", minHeight: "24px" }}
                />
                <div className="grow">{item.content}</div>
              </div>
            ))}
          </ReactSortable>
        </div>
        {/* Topics */}
        <div className="flex w-full flex-col rounded-xl col-span-3 lg:col-span-1">
          <Input
            onChange={(e) => setTopicInputValue(e.target.value)}
            value={topicInputValue}
            className="mb-6 rounded-lg bg-transparent py-6 text-base focus-visible:outline-none focus-visible:ring-transparent border-black/15"
            placeholder="Add a topic"
            onKeyDown={(e) => addFromInput(e)}
          />
          <div
            onDragOver={(e) => onDrag(e)}
            onDragEnter={(e) => onDrag(e)}
            onDrop={(e) => dropTopics(e)}
          >
            <ReactSortable
              list={topics}
              setList={setTopics}
              className="mb-10 flex min-h-20 flex-col gap-4"
              animation={150}
              chosenClass=""
            >
              {topics.map((item, index) => (
                <div
                  draggable
                  onDragStart={(event) => drag(event, "topics")}
                  className={`shadow-sm border-black/15 flex cursor-pointer items-center gap-2 rounded-lg border p-3 transition hover:scale-105 
                    ${
                      highlightedTopic === item.content.toLowerCase()
                        ? "animate-pulse bg-gray-400 text-white"
                        : "bg-secondary"
                    }`}
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                >
                  <GripVertical
                    size={24}
                    className="w-8 shrink-0 text-left opacity-25"
                    style={{ minWidth: "24px", minHeight: "24px" }}
                  />
                  <div className="grow">{item.content}</div>
                </div>
              ))}
            </ReactSortable>
          </div>
        </div>
        {/* Included Topics */}
        <div
          onDragOver={(e) => onDrag(e)}
          onDragEnter={(e) => onDrag(e)}
          onDrop={(e) => dropIncludedTopics(e)}
          className="relative size-full rounded-2xl border-[3px] border-green-500/30  bg-green-400/5 p-5 col-span-3 lg:col-span-1"
        >
          <h2 className="mb-5 text-xl font-semibold text-green-500/90">
            Included
          </h2>
          <ReactSortable
            list={includedTopics}
            setList={(newList) => {
              setIncludedTopics(newList);
            }}
            className="mb-16 flex min-h-40 flex-col gap-4"
            animation={150}
            chosenClass=""
            onEnd={() => handleShowNumbers()}
          >
            {includedTopics.map((item, index) => {
              return (
                <div
                  draggable
                  onDragStart={(event) => drag(event, "included")}
                  className={`shadow-sm border-black/15 flex cursor-pointer items-center gap-2 rounded-lg border p-3 transition hover:scale-105 
                  ${
                    highlightedTopic === item.content.toLowerCase()
                      ? "animate-pulse bg-gray-400 text-white"
                      : "bg-secondary"
                  }`}
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                >
                  <GripVertical
                    size={24}
                    className="w-8 shrink-0 text-left opacity-25"
                    style={{ minWidth: "24px", minHeight: "24px" }}
                  />
                  <div className="flex-1">{item.content}</div>
                  {showNumbers && (
                    <p className="flex size-6 items-center justify-center rounded-full opacity-80 bg-green-200 text-green-600text-sm font-semibold">
                      {index + 1}
                    </p>
                  )}
                </div>
              );
            })}
          </ReactSortable>
        </div>
      </div>

      {/* Error Message */}
      {error ? (
        <div className="text-xs bg-red-100 text-red-500 w-full p-3 rounded-md border-red-200 border-2  flex flex-col gap-2">
          <span className="font-bold text-xl">{error.message}</span>
          <span>code: {error.status}</span>
          <span>status text : {error.statusText}</span>
        </div>
      ) : null}

      <div className="mt-10 flex items-end justify-end">
        <Button
          className="w-1/4"
          onClick={handleSubmit}
          disabled={loading || !includedTopics.length}
        >
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default SortTopics;
