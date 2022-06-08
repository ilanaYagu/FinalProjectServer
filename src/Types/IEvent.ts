import { IBasicItem } from "./IBasicitem";

export interface IEvent extends IBasicItem {
  beginningTime: string;
  endingTime: string;
  color: string;
  location: string;
  notificationTime: string;
  invitedGuests: string[];
}
