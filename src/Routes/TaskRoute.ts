import { Router } from "express";
const router: Router = Router();
import * as TaskController from "../Controllers/TaskController";

router.get("/all", TaskController.getAllTasks);

router.post("/add", TaskController.addTask);

router.post("/update", TaskController.updateTask);

router.post("/delete", TaskController.deleteTask);

export default router;
