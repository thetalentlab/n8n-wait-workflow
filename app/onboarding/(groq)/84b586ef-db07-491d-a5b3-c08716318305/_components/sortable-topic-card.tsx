import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { TopicCard } from "./topic-card";

interface SortableTopicCardProps {
  topic: Topic;
}

export const SortableTopicCard = ({ topic }: SortableTopicCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: topic.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(isDragging && "dragging")}
    >
      <TopicCard topic={topic} />
    </div>
  );
};
