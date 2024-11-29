interface TopicCardProps {
  topic: Topic;
}

export const TopicCard = ({ topic }: TopicCardProps) => {
  return (
    <div className="topic-card">
      <p className="text-gray-800">{topic.content}</p>
    </div>
  );
};
