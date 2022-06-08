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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Event_1 = __importDefault(require("./Models/Event"));
const app = (0, express_1.default)();
const mongoose = require('mongoose');
const cors = require('cors');
const EventRoute_1 = __importDefault(require("./Routes/EventRoute"));
const TaskRoute_1 = __importDefault(require("./Routes/TaskRoute"));
app.use(express_1.default.json({ type: '*/*' }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cors());
const db = require('./keys').mongoURI;
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch((error) => {
    console.log("Unable to connect to the db: " + error.message);
    return process.exit(1);
});
app.use("/events", EventRoute_1.default);
app.use("/tasks", TaskRoute_1.default);
//404 response
app.use((error, res, next) => {
    try {
        res.status(404).send("Resource not found");
    }
    catch (error) {
        next(error);
    }
});
app.use((error, res, next) => {
    try {
        const status = error.status || 500;
        const message = error.message ||
            "There was an error while processing your request, please try again";
        return res.status(status).send({
            status,
            message,
        });
    }
    catch (error) {
        next(error);
    }
});
const port = 5000;
const server = app.listen(port, () => {
    console.log(`Application started on ${port}...`);
});
//___________________
const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000",
    }
});
io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("sendEventsNotifications", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
                const nowDate = getDateAsSavedInDatabase(new Date());
                console.log(nowDate);
                try {
                    const events = yield Event_1.default.find({
                        notificationTime: nowDate
                    });
                    console.log(events);
                    if (events.length !== 0) {
                        socket.emit("notification", events);
                    }
                }
                catch (err) {
                    console.log(err);
                }
            }), 60000);
        }
        catch (err) {
            console.log(err);
        }
    }));
    socket.on('disconnect', () => {
        console.log('Disconnected');
    });
});
const getDateAsSavedInDatabase = (date) => date.getFullYear() + "-" + pad(date.getMonth() + 1) + '-' + pad(date.getDate()) + ' ' + pad(date.getHours()) + ':' + pad(date.getMinutes());
const pad = (value) => value < 10 ? '0' + value : value;
exports.default = app;
