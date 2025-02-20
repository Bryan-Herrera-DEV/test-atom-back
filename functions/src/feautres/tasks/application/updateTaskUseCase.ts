import { NotFoundError } from "../../../shared/errors/commonErrors/NotFoundError";
import { CustomError } from "../../../shared/errors/CustomError";
import { ITaskRepository } from "../domain/ITaskRepository";
import { Task, TTaskType } from "../domain/Task";

interface UpdateTaskDTO {
  title?: string;
  description?: string;
  type?: TTaskType;
  userEmail: string; // Necesario para verificar que es el dueño
}

export class UpdateTaskUseCase {
  constructor(private readonly taskRepository: ITaskRepository) {}

  public async execute(id: string, dto: UpdateTaskDTO): Promise<Task> {
    const task = await this.taskRepository.getTaskById(id);
    if (!task) {
      throw new NotFoundError("Task", id);
    }

    // Verificar que el userEmail coincida
    if (task.getUserEmail() !== dto.userEmail) {
      throw new CustomError("No tienes permiso para editar esta tarea", 403);
    }

    // Actualizamos
    if (dto.title) {
      task.updateTitle(dto.title);
    }
    if (dto.description) {
      task.updateDescription(dto.description);
    }
    if (dto.type) {
      task.updateType(dto.type);
    }

    const updated = await this.taskRepository.updateTask(task);
    return updated;
  }
}
