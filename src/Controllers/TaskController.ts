import { Request, Response, NextFunction } from "express";
import Task from "../Models/Task";
import { ITask } from "../Types/ITask";

export const CreateTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.body.task) {
      return next(res.status(400).json({ message: "Invalid details provided!" }));
    } else {
      let { _id, ...taskFields } = req.body.task;
      const newTask = await new Task(taskFields).save();
      return res.status(201).json({ task: newTask });
    }
  } catch (error: any) {
    next(error);
  }
};

export const getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const getTasks = await Task.find();
    if (getTasks) {
      res.status(200).json({ tasks: getTasks });
    } else {
      return next(res.status(404).json({ message: "Not found." }));
    }
  } catch (error: any) {
    next(error);
  }
};

export const getTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.params._id) {
      return next(res.status(400).json({ message: "Operation failed, invalid details provided.", }));
    } else {
      const getTasks = await Task.findById({ _id: req.params._id });
      if (getTasks) {
        res.status(200).json(getTasks);
      } else {
        return next(res.status(404).json({ message: "Not found." }));
      }
    }
  } catch (error: any) {
    next(error);
  }
};

export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.body._id) {
      return next(res.status(400).json({ message: "Operation failed, invalid details provided." }));
    } else {
      const deletedTask = await Task.findOneAndRemove({ _id: req.body._id });
      if (deletedTask) {
        res.status(200).json({ _id: deletedTask._id });
      } else {
        return next(res.status(404).json({ message: "Not found." }));
      }
    }
  } catch (error: any) {
    next(error);
  }
};

export const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      {
        _id: req.body.task._id
      },
      {
        $set: {
          title: req.body.task.title, description: req.body.task.description, estimatedTime: req.body.task.estimatedTime,
          status: req.body.task.status, priority: req.body.task.priority, review: req.body.task.review, timeSpent: req.body.task.timeSpent,
          untilDate: req.body.task.untilDate
        }
      }
    );
    if (updatedTask) {
      res.status(200).json({ task: req.body.task });
    } else {
      return next(res.status(404).json({ message: "Not found." }));
    }
  } catch (error: any) {
    next(error);
  }
};
