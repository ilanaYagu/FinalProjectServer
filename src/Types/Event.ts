import { BasicItem } from "./Basicitem";

export interface Event extends BasicItem {
  beginningTime: string;
  endingTime: string;
  color: string;
  location: string;
  notificationTime: string;
  invitedGuests: string[];
}
