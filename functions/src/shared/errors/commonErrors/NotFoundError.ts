import { CustomError } from "../CustomError";

export class NotFoundError extends CustomError {
  constructor(entity: string, criteria?: string) {
    const criteriaMessage = criteria ? `: ${criteria}` : "";
    super(`${entity} not found${criteriaMessage}`, 404);
  }
}
