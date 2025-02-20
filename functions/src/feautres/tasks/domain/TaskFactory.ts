import { Task, TTaskType } from "./Task";

interface CreateTaskFactoryProps {
  title: string;
  description: string;
  userEmail: string;
  type?: TTaskType;
}

export class TaskFactory {
  public static create(props: CreateTaskFactoryProps): Task {
    return new Task({
      title: props.title,
      description: props.description,
      userEmail: props.userEmail,
      type: props.type ?? "GETTING_STARTED",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
