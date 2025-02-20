export type TTaskType = "GETTING_STARTED" | "IN_PROGRESS" | "DONE";

export interface TaskProps {
  id?: string;
  title: string;
  description: string;
  type: TTaskType;
  createdAt: Date;
  updatedAt: Date;
  userEmail: string; // Este es el "dueño" de la tarea
}

export class Task {
  private readonly id?: string;
  private title: string;
  private description: string;
  private type: TTaskType;
  private readonly createdAt: Date;
  private updatedAt: Date;
  private readonly userEmail: string;

  constructor(props: TaskProps) {
    this.id = props.id;
    this.title = props.title;
    this.description = props.description;
    this.type = props.type;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.userEmail = props.userEmail;
  }

  public getId(): string | undefined {
    return this.id;
  }

  public getTitle(): string {
    return this.title;
  }

  public getDescription(): string {
    return this.description;
  }

  public getType(): TTaskType {
    return this.type;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public getUserEmail(): string {
    return this.userEmail;
  }

  public updateTitle(title: string): void {
    this.title = title;
    this.touch();
  }

  public updateDescription(description: string): void {
    this.description = description;
    this.touch();
  }

  public updateType(type: TTaskType): void {
    this.type = type;
    this.touch();
  }

  // Actualiza fecha de modificación
  private touch(): void {
    this.updatedAt = new Date();
  }
}
