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
const EventRoute_1 = __importDefault(require("./Routes/EventRoute"));
const TaskRoute_1 = __importDefault(require("./Routes/TaskRoute"));
const socket_io_1 = require("socket.io");
const mongoose_1 = require("mongoose");
const cors_1 = __importDefault(require("cors"));
const keys_1 = require("./keys");
const app = (0, express_1.default)();
app.use(express_1.default.json({ type: '*/*' }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
(0, mongoose_1.connect)(keys_1.keys.mongoURI)
    .then(() => console.log('MongoDB Connected'))
    .catch((error) => {
    console.log("Unable to connect to the db: " + error.message);
    return process.exit(1);
});
app.use("/events", EventRoute_1.default);
app.use("/tasks", TaskRoute_1.default);
const port = 1025;
const server = app.listen(port, () => {
    console.log(`Application started on ${port}...`);
});
const io = new socket_io_1.Server(server, {
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
                const currentDate = getDBFormatDate(new Date());
                console.log(currentDate);
                let events = yield Event_1.default.find({ notificationTime: currentDate });
                console.log(events);
                if (events.length) {
                    socket.emit("notification", events.map((event) => ({ _id: event._id, title: event.title, description: event.description })));
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
const getDBFormatDate = (date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
const pad = (value) => value < 10 ? '0' + value : value;
exports.default = app;
