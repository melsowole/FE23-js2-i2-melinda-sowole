import { Router } from "express";
import { getTasks, addTask, updateTask, deleteTask } from "./reqHandlers.js";

const router = Router();

router
  .route("/")
  .get(getTasks)
  .post(addTask)
  .patch(updateTask)
  .delete(deleteTask);

router.route("/:id").get(getTasks).patch(updateTask).delete(deleteTask);

export { router };
