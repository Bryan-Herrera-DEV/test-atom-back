import { Task } from "./Task";

export interface ITaskRepository {
  getAllTasks(): Promise<Task[]>;
  createTask(task: Omit<Task, "id">): Promise<Task>;
  updateTask(id: string, task: Partial<Task>): Promise<Task>;
  deleteTask(id: string): Promise<void>;
  getTaskById(id: string): Promise<Task | null>;
}
