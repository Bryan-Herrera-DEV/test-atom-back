import { NotFoundError } from "../../../shared/errors/commonErrors/NotFoundError";
import { IUserRepository } from "../domain/IUserRepository";
import { User } from "../domain/User";

export class GetUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  public async execute(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundError("User", email);
    }
    return user;
  }
}
