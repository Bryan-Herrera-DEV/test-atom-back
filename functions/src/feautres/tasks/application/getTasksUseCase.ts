import { ITaskRepository } from "../domain/ITaskRepository";
import { Task } from "../domain/Task";

export class GetTasksUseCase {
  constructor(private readonly taskRepository: ITaskRepository) {}

  public async execute(userEmail: string): Promise<Task[]> {
    return this.taskRepository.getAllTasksByUser(userEmail);
  }
}
