import { ITaskRepository } from "../domain/ITaskRepository";
import { Task } from "../domain/Task";

interface CreateTaskDTO {
  title: string;
  description: string;
}

export class CreateTaskUseCase {
  constructor(private readonly taskRepository: ITaskRepository) {}

  public async execute(dto: CreateTaskDTO): Promise<Task> {
    const newTask: Omit<Task, "id"> = {
      title: dto.title,
      description: dto.description,
      type: "GETTING_STARTED",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const createdTask = await this.taskRepository.createTask(newTask);
    return createdTask;
  }
}
