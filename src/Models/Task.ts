import mongoose, { Schema } from "mongoose";
import { Task } from "../Types/Task";
const TaskSchema: Schema = new Schema<Task>(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    estimatedTime: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    priority: {
      type: String,
      required: true
    },
    review: {
      type: String,
      required: true
    },
    timeSpent: {
      type: String,
      required: false
    },
    untilDate: {
      type: String,
      required: false
    }
  }
);
const Task = mongoose.model<Task>("Task", TaskSchema);
export default Task;
