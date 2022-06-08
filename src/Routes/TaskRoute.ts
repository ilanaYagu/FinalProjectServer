import { Router } from "express";
const router: Router = Router();
import * as TaskController from "../Controllers/TaskController";

router.get("/all", TaskController.getAllTasks);

router.post("/add", TaskController.CreateTask);

router.get("/:userId", TaskController.getTask);

router.post("/update-task", TaskController.updateTask);

router.post("/delete-task", TaskController.deleteTask);

export default router;
