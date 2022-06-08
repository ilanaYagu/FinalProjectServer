import { Request, Response, NextFunction } from "express";
import Event from "../Models/Event";

export const addEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.body.event) {
      return next(res.status(400).json({ message: "Invalid data provided!" }));
    } else {
      const { _id, ...eventFields } = req.body.event;
      const newEvent = await new Event(eventFields).save();
      return res.status(201).json({ event: newEvent });
    }
  } catch (error: any) {
    next(error);
  }
};

export const getAllEvents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const getEvents = await Event.find();
    if (getEvents) {
      res.status(200).json({ events: getEvents });
    } else {
      return next(res.status(404).json({ message: "Not found." }));
    }
  } catch (error: any) {
    next(error);
  }
};

export const deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.body._id) {
      return next(res.status(400).json({ message: "Operation failed, invalid data provided." }));
    } else {
      const deletedEvent = await Event.findOneAndRemove({ _id: req.body._id });
      if (deletedEvent) {
        res.status(200).json({ _id: deletedEvent._id });
      } else {
        return next(res.status(404).json({ message: "Not found." }));
      }
    }
  } catch (error: any) {
    next(error);
  }
};

export const updateEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { _id, ...eventFields } = req.body.event;

    const updatedEvent = await Event.findByIdAndUpdate(
      {
        _id: _id,
      },
      {
        $set: eventFields
      }
    );
    if (updatedEvent) {
      res.status(200).json({ event: req.body.event });
    } else {
      return next(res.status(404).json({ message: "Not found." }));
    }
  } catch (error: any) {
    next(error);
  }
};
