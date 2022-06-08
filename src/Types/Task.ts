import { BasicItem } from "./Basicitem";

export interface Task extends BasicItem {
  estimatedTime: string;
  status: StatusType;
  priority: PriorityType;
  review: string;
  timeSpent: string;
  untilDate: string;
}

enum PriorityType {
  Low = "Low",
  Regular = "Regular",
  Top = "Top"
}

enum StatusType {
  Open = "Open",
  InProgress = "In Progress",
  Done = "Done"
}
