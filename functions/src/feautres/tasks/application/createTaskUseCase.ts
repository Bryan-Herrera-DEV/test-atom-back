import { NotFoundError } from "../../../shared/errors/commonErrors/NotFoundError";
import { IUserRepository } from "../../user/domain/IUserRepository";
import { ITaskRepository } from "../domain/ITaskRepository";
import { Task, TTaskType } from "../domain/Task";
import { TaskFactory } from "../domain/TaskFactory";

interface CreateTaskDTO {
  title: string;
  description: string;
  userEmail: string;
  type?: string;
}

export class CreateTaskUseCase {
  constructor(
    private readonly taskRepository: ITaskRepository,
    private readonly userRepository: IUserRepository
  ) {}

  public async execute(dto: CreateTaskDTO): Promise<Task> {
    const user = await this.userRepository.findByEmail(dto.userEmail);
    if (!user) {
      console.log("User not found");
      throw new NotFoundError("User", dto.userEmail);
    }

    const task = TaskFactory.create({
      title: dto.title,
      description: dto.description,
      userEmail: dto.userEmail,
      type: dto.type as TTaskType,
    });

    const createdTask = await this.taskRepository.createTask(task);
    return createdTask;
  }
}
