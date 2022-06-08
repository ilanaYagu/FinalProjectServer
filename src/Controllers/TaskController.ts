import { Request, Response, NextFunction } from "express";
import Task from "../Models/Task";

export const addTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.body.task) {
      return next(res.status(400).json({ message: "Invalid data provided!" }));
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

export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.body._id) {
      return next(res.status(400).json({ message: "Operation failed, invalid data provided." }));
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
    let { _id, ...taskFields } = req.body.task;

    const updatedTask = await Task.findOneAndUpdate(
      {
        _id: _id
      },
      {
        $set: taskFields
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
