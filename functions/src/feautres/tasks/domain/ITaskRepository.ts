import { Task } from "./Task";

export interface ITaskRepository {
  getAllTasksByUser(userEmail: string): Promise<Task[]>;
  getTaskById(id: string): Promise<Task | null>;
  createTask(task: Task): Promise<Task>;
  updateTask(task: Task): Promise<Task>;
  deleteTask(id: string): Promise<void>;
}
