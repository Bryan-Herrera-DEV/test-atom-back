import { Request, Response, NextFunction } from "express";
import { TaskRepositoryFirebase } from "../TaskRepositoryFirebase";
import { UserRepositoryFirebase } from "../../../user/infrastructure/UserRepositoryFirebase";
import { DeleteTaskUseCase } from "../../application/deleteTaskUseCase";
import { UpdateTaskUseCase } from "../../application/updateTaskUseCase";
import { CreateTaskUseCase } from "../../application/createTaskUseCase";
import { GetTasksUseCase } from "../../application/getTasksUseCase";

const taskRepository = new TaskRepositoryFirebase();
const userRepository = new UserRepositoryFirebase();

export const getTasksHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userEmail = req.query.userEmail as string;
    if (!userEmail) {
      return res.status(400).json({ message: "userEmail es requerido" });
    }

    const useCase = new GetTasksUseCase(taskRepository);
    const tasks = await useCase.execute(userEmail);
    return res.json(tasks);
  } catch (error) {
    return next(error);
  }
};

// POST /tasks
export const createTaskHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, userEmail, type } = req.body;
    const useCase = new CreateTaskUseCase(taskRepository, userRepository);
    const newTask = await useCase.execute({
      title,
      description,
      userEmail,
      type,
    });
    return res.status(201).json(newTask);
  } catch (error) {
    return next(error);
  }
};

// PUT /tasks/:taskId
export const updateTaskHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { taskId } = req.params;
    const { title, description, type, userEmail } = req.body;

    if (!userEmail) {
      return res.status(400).json({ message: "userEmail es requerido" });
    }

    const useCase = new UpdateTaskUseCase(taskRepository);
    const updatedTask = await useCase.execute(taskId, {
      title,
      description,
      type,
      userEmail,
    });
    return res.json(updatedTask);
  } catch (error) {
    return next(error);
  }
};

// DELETE /tasks/:taskId
export const deleteTaskHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { taskId } = req.params;
    const userEmail = req.query.userEmail as string;
    if (!userEmail) {
      return res.status(400).json({ message: "userEmail es requerido" });
    }

    const useCase = new DeleteTaskUseCase(taskRepository);
    await useCase.execute({ taskId, userEmail });
    return res.sendStatus(204);
  } catch (error) {
    return next(error);
  }
};
