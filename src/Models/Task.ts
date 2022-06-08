import mongoose, { Schema } from "mongoose";
import { ITask } from "../Types/ITask";
const TaskSchema: Schema = new Schema<ITask>(
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
const Task = mongoose.model<ITask>("Task", TaskSchema);
export default Task;
