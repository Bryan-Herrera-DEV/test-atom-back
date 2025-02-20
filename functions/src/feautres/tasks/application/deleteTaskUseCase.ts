import { NotFoundError } from "../../../shared/errors/commonErrors/NotFoundError";
import { CustomError } from "../../../shared/errors/CustomError";
import { ITaskRepository } from "../domain/ITaskRepository";

interface DeleteTaskDTO {
  taskId: string;
  userEmail: string;
}

export class DeleteTaskUseCase {
  constructor(private readonly taskRepository: ITaskRepository) {}

  public async execute({ taskId, userEmail }: DeleteTaskDTO): Promise<void> {
    const task = await this.taskRepository.getTaskById(taskId);
    if (!task) {
      throw new NotFoundError("Task", taskId);
    }
    if (task.getUserEmail() !== userEmail) {
      throw new CustomError("No tienes permiso para eliminar esta tarea", 403);
    }
    await this.taskRepository.deleteTask(taskId);
  }
}
