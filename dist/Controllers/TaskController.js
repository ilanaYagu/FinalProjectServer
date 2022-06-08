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
exports.updateTask = exports.deleteTask = exports.getTask = exports.getAllTasks = exports.CreateTask = void 0;
const Task_1 = __importDefault(require("../Models/Task"));
const CreateTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.task) {
            return next(res.status(400).json({ message: "Invalid details provided!" }));
        }
        else {
            let _a = req.body.task, { _id } = _a, taskFields = __rest(_a, ["_id"]);
            const newTask = yield new Task_1.default(taskFields).save();
            return res.status(201).json({ task: newTask });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.CreateTask = CreateTask;
const getAllTasks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getTasks = yield Task_1.default.find();
        if (getTasks) {
            res.status(200).json({ tasks: getTasks });
        }
        else {
            return next(res.status(404).json({ message: "Not found." }));
        }
    }
    catch (error) {
        next(error);
    }
});
exports.getAllTasks = getAllTasks;
const getTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.params._id) {
            return next(res.status(400).json({ message: "Operation failed, invalid details provided.", }));
        }
        else {
            const getTasks = yield Task_1.default.findById({ _id: req.params._id });
            if (getTasks) {
                res.status(200).json(getTasks);
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
exports.getTask = getTask;
const deleteTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body._id) {
            return next(res.status(400).json({ message: "Operation failed, invalid details provided." }));
        }
        else {
            const deletedTask = yield Task_1.default.findOneAndRemove({ _id: req.body._id });
            if (deletedTask) {
                res.status(200).json({ _id: deletedTask._id });
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
exports.deleteTask = deleteTask;
const updateTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedTask = yield Task_1.default.findOneAndUpdate({
            _id: req.body.task._id
        }, {
            $set: {
                title: req.body.task.title, description: req.body.task.description, estimatedTime: req.body.task.estimatedTime,
                status: req.body.task.status, priority: req.body.task.priority, review: req.body.task.review, timeSpent: req.body.task.timeSpent,
                untilDate: req.body.task.untilDate
            }
        });
        if (updatedTask) {
            res.status(200).json({ task: req.body.task });
        }
        else {
            return next(res.status(404).json({ message: "Not found." }));
        }
    }
    catch (error) {
        next(error);
    }
});
exports.updateTask = updateTask;
