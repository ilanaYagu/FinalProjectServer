import mongoose, { Schema } from "mongoose";
import { IEvent } from "../Types/IEvent";
const EventSchema: Schema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    beginningTime: {
      type: String,
      required: true
    },
    endingTime: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    notificationTime: {
      type: String,
      required: false
    },
    invitedGuests: {
      type: [{
        type: String
      }],
      required: false
    }
  }
);
const Event = mongoose.model<IEvent>("Event", EventSchema);
export default Event;
