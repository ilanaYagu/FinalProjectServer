import { Request, Response, NextFunction } from "express";
import Event from "../Models/Event";
import { IEvent } from "../Types/IEvent";

export const CreateEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.body.event) {
      return next(res.status(400).json({ message: "Invalid details provided!" }));
    } else {
      let { _id, ...eventFields } = req.body.event;
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


export const getEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.params.eventId) {
      return next(res.status(400).json({ message: "Operation failed, invalid details provided." }));
    } else {
      const getEvents = await Event.findById({ _id: req.params.eventId });
      if (getEvents) {
        res.status(200).json(getEvents);
      } else {
        return next(res.status(404).json({ message: "Not found." }));
      }
    }
  } catch (error: any) {
    next(error);
  }
};

export const deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.body._id) {
      return next(res.status(400).json({ message: "Operation failed, invalid details provided." }));
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
    const updatedEvent = await Event.findByIdAndUpdate(
      {
        _id: req.body.event._id,
      },
      {
        $set: {
          title: req.body.event.title, description: req.body.event.description, beginningTime: req.body.event.beginningTime,
          endingTime: req.body.event.endingTime, notificationTime: req.body.event.notificationTime, location: req.body.event.location, color: req.body.event.color,
          invitedGuests: req.body.event.invitedGuests
        }
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
