import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

export function validateDtoMiddleware<T>(dtoClass: new (...args: any[]) => T) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoObj = plainToInstance(dtoClass, req.body);
    const errors = await validate(dtoObj as {});

    if (errors.length > 0) {
      const formattedErrors = errors.map((err) => ({
        property: err.property,
        constraints: err.constraints,
      }));
      return res.status(400).json({ message: "Validation errors", errors: formattedErrors });
    }
    req.body = dtoObj;
    return next();
  };
}
