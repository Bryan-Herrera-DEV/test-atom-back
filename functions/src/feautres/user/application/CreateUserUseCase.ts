import { IUserRepository } from "../domain/IUserRepository";
import { UserFactory } from "../domain/UserFactory";
import { User } from "../domain/User";
import { CustomError } from "../../../shared/errors/CustomError";

interface CreateUserDTO {
  email: string;
  name: string;
  lastName: string;
}

export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  public async execute(dto: CreateUserDTO): Promise<User> {
    const existing = await this.userRepository.findByEmail(dto.email);
    if (existing) {
      throw new CustomError(`El usuario con email ${dto.email} ya existe`, 400);
    }

    const user = UserFactory.create({
      email: dto.email,
      name: dto.name,
      lastName: dto.lastName,
    });

    const createdUser = await this.userRepository.create(user);
    return createdUser;
  }
}
