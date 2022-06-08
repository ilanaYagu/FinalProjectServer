import { Router } from "express";
const router: Router = Router();
import * as EventController from "../Controllers/EventController";

router.get("/all", EventController.getAllEvents);

router.post("/add", EventController.addEvent);

router.post("/update", EventController.updateEvent);

router.post("/delete", EventController.deleteEvent);

export default router;
