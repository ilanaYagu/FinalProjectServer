import express from "express";
import { Response, NextFunction } from "express";
import Event from "./Models/Event";
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

import EventRoute from "./Routes/EventRoute";
import TaskRoute from "./Routes/TaskRoute";

app.use(express.json({ type: '*/*' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors())

const db = require('./keys').mongoURI;
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch((error: any) => {
    console.log("Unable to connect to the db: " + error.message);
    return process.exit(1);
  });

app.use("/events", EventRoute);
app.use("/tasks", TaskRoute);

//404 response
app.use((error: any, res: Response, next: NextFunction) => {
  try {
    res.status(404).send("Resource not found");
  } catch (error) {
    next(error);
  }
});

app.use((error: any, res: Response, next: NextFunction) => {
  try {
    const status = error.status || 500;
    const message =
      error.message ||
      "There was an error while processing your request, please try again";
    return res.status(status).send({
      status,
      message,
    });
  } catch (error) {
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

io.on("connection", (socket: any) => {
  console.log("a user connected");
  socket.on("sendEventsNotifications", async () => {
    try {
      setInterval(async () => {
        const nowDate = getDateAsSavedInDatabase(new Date());
        console.log(nowDate)
        try {
          const events = await Event.find({
            notificationTime: nowDate
          })
          console.log(events)
          if (events.length !== 0) {
            socket.emit("notification", events);
          }
        } catch (err) {
          console.log(err)
        }
      }, 60000)
    } catch (err) {
      console.log(err)
    }
  });
  socket.on('disconnect', () => {
    console.log('Disconnected');
  });
});

const getDateAsSavedInDatabase = (date: Date) =>
  date.getFullYear() + "-" + pad(date.getMonth() + 1) + '-' + pad(date.getDate()) + ' ' + pad(date.getHours()) + ':' + pad(date.getMinutes());

const pad = (value: Number) =>
  value < 10 ? '0' + value : value

export default app;
