import mongoose, { Schema } from "mongoose";
import { Event } from "../Types/Event";
const EventSchema: Schema = new Schema<Event>(
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
      required: false
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
const Event = mongoose.model<Event>("Event", EventSchema);
export default Event;
