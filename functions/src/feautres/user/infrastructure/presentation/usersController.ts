import { Request, Response, NextFunction } from "express";
import { UserRepositoryFirebase } from "../UserRepositoryFirebase";
import { CreateUserUseCase } from "../../application/CreateUserUseCase";
import { GetUserUseCase } from "../../application/GetUserUseCase";

const userRepository = new UserRepositoryFirebase();

export const createUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, name, lastName } = req.body;
    const useCase = new CreateUserUseCase(userRepository);
    const user = await useCase.execute({ email, name, lastName });
    return res.status(201).json({
      id: user.getId(),
      email: user.getEmail(),
      createdAt: user.getCreatedAt(),
    });
  } catch (error) {
    return next(error);
  }
};

export const getUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.params;
    const useCase = new GetUserUseCase(userRepository);
    const user = await useCase.execute(email);
    return res.json({
      id: user.getId(),
      email: user.getEmail(),
      createdAt: user.getCreatedAt(),
    });
  } catch (error) {
    return next(error);
  }
};
