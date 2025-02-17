export interface UserProps {
  id?: string;
  name: string;
  lastName: string;
  email: string;
  createdAt: Date;
}

export class User {
  private readonly id?: string;
  private readonly email: string;
  private readonly createdAt: Date;
  private readonly name: string;
  private readonly lastName: string;

  constructor(props: UserProps) {
    this.id = props.id;
    this.email = props.email;
    this.createdAt = props.createdAt;
    this.name = props.name;
    this.lastName = props.lastName;
  }

  public getId(): string | undefined {
    return this.id;
  }

  public getEmail(): string {
    return this.email;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  get getName(): string {
    return this.name;
  }

  get getLastName(): string {
    return this.lastName;
  }

  public getFullName(): string {
    return `${this.name} ${this.lastName}`;
  }
}
