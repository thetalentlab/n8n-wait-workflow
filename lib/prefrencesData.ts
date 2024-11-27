import {
  Book,
  Headphones,
  Tv,
  School,
  MonitorPlay,
  Brain,
  Users,
  MessageCircle,
  Keyboard,
} from "lucide-react";

export const learningPreferences = [
  {
    id: 1,
    label: "Reading",
    icon: Book,
    metadata: "async",
  },
  {
    id: 2,
    label: "Listening",
    icon: Headphones,
    metadata: "async",
  },
  {
    id: 3,
    label: "Watching",
    icon: Tv,
    metadata: "async",
  },
  {
    id: 4,
    label: "Attending Lectures",
    icon: School,
    metadata: "sync",
  },
  {
    id: 5,
    label: "Online Courses",
    icon: MonitorPlay,
    metadata: "sync",
  },
  {
    id: 6,
    label: "Memorizing",
    icon: Brain,
    metadata: "async",
  },
  {
    id: 7,
    label: "Attending a Workshop",
    icon: Users,
    metadata: "sync",
  },
  {
    id: 8,
    label: "Hands-On Practice",
    icon: Keyboard,
    metadata: "async",
  },
  {
    id: 9,
    label: "Collaborative Learning",
    icon: MessageCircle,
    metadata: "async",
  },
];
