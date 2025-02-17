import { ITaskRepository } from "../domain/ITaskRepository";
import { Task } from "../domain/Task";

export class GetTasksUseCase {
  constructor(private readonly taskRepository: ITaskRepository) {}

  public async execute(): Promise<Task[]> {
    const tasks = await this.taskRepository.getAllTasks();
    return tasks;
  }
}
