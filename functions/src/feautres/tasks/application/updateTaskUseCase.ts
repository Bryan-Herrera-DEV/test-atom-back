import { ITaskRepository } from '../domain/ITaskRepository';
import { Task, TTaskType } from '../domain/Task';

interface UpdateTaskDTO {
  title?: string;
  description?: string;
  type?: TTaskType;
}

export class UpdateTaskUseCase {
  constructor(private readonly taskRepository: ITaskRepository) {}

  public async execute(id: string, dto: UpdateTaskDTO): Promise<Task> {
    const updatedTask = await this.taskRepository.updateTask(id, { ...dto });
    return updatedTask;
  }
}
