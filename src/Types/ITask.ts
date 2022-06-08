import { IBasicItem } from "./IBasicitem";

export interface ITask extends IBasicItem {
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
