import { ITaskRepository } from '../domain/ITaskRepository';

export class DeleteTaskUseCase {
  constructor(private readonly taskRepository: ITaskRepository) {}

  public async execute(id: string): Promise<void> {
    await this.taskRepository.deleteTask(id);
  }
}
