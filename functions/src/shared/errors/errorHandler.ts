import { Request, Response, NextFunction } from "express";
import { CustomError } from "./CustomError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): Response => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ errors: err.serializeErrors() });
  }
  return res.status(500).json({
    errors: [{ message: "Ocurrió un error inesperado" }],
  });
};
