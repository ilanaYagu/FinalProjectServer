import express from "express";
import Event from "./Models/Event";
import EventRoute from "./Routes/EventRoute";
import TaskRoute from "./Routes/TaskRoute";
import { Server } from "socket.io";
import { connect } from "mongoose";
import cors from 'cors';
import { keys } from './keys';

const app = express();
app.use(express.json({ type: '*/*' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

connect(keys.mongoURI)
  .then(() => console.log('MongoDB Connected'))
  .catch((error: any) => {
    console.log("Unable to connect to the db: " + error.message);
    return process.exit(1);
  });

app.use("/events", EventRoute);
app.use("/tasks", TaskRoute);

const port = 1025;
const server = app.listen(port, () => {
  console.log(`Application started on ${port}...`);
});

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  }
});

io.on("connection", (socket: any) => {
  console.log("a user connected");
  let notificationsIntervalId: NodeJS.Timeout;
  socket.on("sendEventsNotifications", async () => {
    try {
      notificationsIntervalId = setInterval(async () => {
        const currentDate = getDBFormatDate(new Date());
        console.log(currentDate);
        let events = await Event.find({ notificationTime: currentDate })
        console.log(events);
        if (events.length) {
          socket.emit("notification", events.map((event) => ({ _id: event._id, title: event.title, description: event.description })));
        }
      }, 60000)
    } catch (err) {
      console.log(err)
    }
  });
  socket.on('disconnect', () => {
    console.log('Disconnected');
    clearInterval(notificationsIntervalId);
  });
});

const getDBFormatDate = (date: Date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`

const pad = (value: Number) =>
  value < 10 ? '0' + value : value

export default app;
