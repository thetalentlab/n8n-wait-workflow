import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { cn } from "@/lib/utils";
import { SortableTopicCard } from "./sortable-topic-card";
import { useDroppable } from "@dnd-kit/core";

interface ColumnProps {
  id: string;
  title?: string;
  items: Topic[];
  variant: "exclude" | "include" | "neutral";
}

export const Column = ({ id, title, items, variant }: ColumnProps) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={cn("column", {
        "exclude-column": variant === "exclude",
        "include-column": variant === "include",
        "neutral-column": variant === "neutral",
      })}
    >
      {title && (
        <h2 className="text-lg font-semibold mb-4 text-center">{title}</h2>
      )}
      <SortableContext
        items={items.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-3">
          {items.map((topic) => (
            <SortableTopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};
