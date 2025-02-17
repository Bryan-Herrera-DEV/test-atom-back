import { CreateTaskDTO } from "../../../feautres/tasks/infrastructure/DTOs/CreateTaskDto";
import { validateDtoMiddleware } from "../../middlewares/validate-dto.middleware";
import {
  createTaskHandler,
  deleteTaskHandler,
  getTasksHandler,
  updateTaskHandler,
} from "./../../../feautres/tasks/infrastructure/presentation/tasksController";
import { Router } from "express";
export const registerTaskRoutes = (router: Router) => {
  router.get("/tasks", getTasksHandler);
  router.post(
    "/tasks",
    validateDtoMiddleware(CreateTaskDTO),
    createTaskHandler
  );
  router.put("/tasks/:taskId", updateTaskHandler);
  router.delete("/tasks/:taskId", deleteTaskHandler);
};
