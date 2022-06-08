import { Router } from "express";
const router: Router = Router();
import * as EventController from "../Controllers/EventController";

router.post("/add", EventController.CreateEvent);

router.get("/all", EventController.getAllEvents);

router.get("/event-details/:event_id", EventController.getEvent);

router.post("/update-event", EventController.updateEvent);

router.post("/delete-event", EventController.deleteEvent);

export default router;
