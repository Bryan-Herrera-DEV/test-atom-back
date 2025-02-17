import { Request, Response, NextFunction } from 'express';
import { TaskRepositoryFirebase } from '../../infrastructure/TaskRepositoryFirebase';
import { GetTasksUseCase } from '../../application/getTasksUseCase';
import { CreateTaskUseCase } from '../../application/createTaskUseCase';
import { UpdateTaskUseCase } from '../../application/updateTaskUseCase';
import { DeleteTaskUseCase } from '../../application/deleteTaskUseCase';

const taskRepository = new TaskRepositoryFirebase();

export const getTasksHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const getTasksUseCase = new GetTasksUseCase(taskRepository);
    const tasks = await getTasksUseCase.execute();
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

// POST /tasks
export const createTaskHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createTaskUseCase = new CreateTaskUseCase(taskRepository);
    const newTask = await createTaskUseCase.execute(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

// PUT /tasks/:taskId
export const updateTaskHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { taskId } = req.params;
    const updateTaskUseCase = new UpdateTaskUseCase(taskRepository);
    const updatedTask = await updateTaskUseCase.execute(taskId, req.body);
    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
};

// DELETE /tasks/:taskId
export const deleteTaskHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { taskId } = req.params;
    const deleteTaskUseCase = new DeleteTaskUseCase(taskRepository);
    await deleteTaskUseCase.execute(taskId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
