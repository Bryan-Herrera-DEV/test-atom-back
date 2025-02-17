import { User, UserProps } from "./User";

export class UserFactory {
  public static create(props: Omit<UserProps, "createdAt">): User {
    return new User({
      ...props,
      createdAt: new Date(),
    });
  }
}
