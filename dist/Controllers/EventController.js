"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEvent = exports.deleteEvent = exports.getEvent = exports.getAllEvents = exports.CreateEvent = void 0;
const Event_1 = __importDefault(require("../Models/Event"));
const CreateEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.event) {
            return next(res.status(400).json({ message: "Invalid details provided!" }));
        }
        else {
            let _a = req.body.event, { _id } = _a, eventFields = __rest(_a, ["_id"]);
            const newEvent = yield new Event_1.default(eventFields).save();
            return res.status(201).json({ event: newEvent });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.CreateEvent = CreateEvent;
const getAllEvents = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getEvents = yield Event_1.default.find();
        if (getEvents) {
            res.status(200).json({ events: getEvents });
        }
        else {
            return next(res.status(404).json({ message: "Not found." }));
        }
    }
    catch (error) {
        next(error);
    }
});
exports.getAllEvents = getAllEvents;
const getEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.params.eventId) {
            return next(res.status(400).json({ message: "Operation failed, invalid details provided." }));
        }
        else {
            const getEvents = yield Event_1.default.findById({ _id: req.params.eventId });
            if (getEvents) {
                res.status(200).json(getEvents);
            }
            else {
                return next(res.status(404).json({ message: "Not found." }));
            }
        }
    }
    catch (error) {
        next(error);
    }
});
exports.getEvent = getEvent;
const deleteEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body._id) {
            return next(res.status(400).json({ message: "Operation failed, invalid details provided." }));
        }
        else {
            const deletedEvent = yield Event_1.default.findOneAndRemove({ _id: req.body._id });
            if (deletedEvent) {
                res.status(200).json({ _id: deletedEvent._id });
            }
            else {
                return next(res.status(404).json({ message: "Not found." }));
            }
        }
    }
    catch (error) {
        next(error);
    }
});
exports.deleteEvent = deleteEvent;
const updateEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedEvent = yield Event_1.default.findByIdAndUpdate({
            _id: req.body.event._id,
        }, {
            $set: {
                title: req.body.event.title, description: req.body.event.description, beginningTime: req.body.event.beginningTime,
                endingTime: req.body.event.endingTime, notificationTime: req.body.event.notificationTime, location: req.body.event.location, color: req.body.event.color,
                invitedGuests: req.body.event.invitedGuests
            }
        });
        if (updatedEvent) {
            res.status(200).json({ event: req.body.event });
        }
        else {
            return next(res.status(404).json({ message: "Not found." }));
        }
    }
    catch (error) {
        next(error);
    }
});
exports.updateEvent = updateEvent;
