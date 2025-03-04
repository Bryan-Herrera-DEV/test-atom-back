import { ResponseProvider } from "./../../shared/providers/Response/infraestructure/Response";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

const notFoundHandler = () => {
  return (req: Request, res: Response, _: NextFunction) => {
    const responseProvider = ResponseProvider(res);
    return responseProvider(
      StatusCodes.NOT_FOUND,
      `Path '${req.originalUrl}' not found`,
      null
    );
  };
};

const clientErrorHandler = (): ErrorRequestHandler => {
  return (err: Error, req: Request, res: Response, next: NextFunction) => {
    const responseProvider = ResponseProvider(res);

    if (req.xhr && !(err instanceof SyntaxError)) {
      return responseProvider(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Something went wrong",
        null
      );
    } else {
      return next(err);
    }
  };
};

const errorHandler = (): ErrorRequestHandler => {
  return (err: Error, _: Request, res: Response, __: NextFunction) => {
    const responseProvider = ResponseProvider(res);

    if (err.name && err.name === "UnauthorizedError") {
      const innerMessage = err.message;
      return responseProvider(StatusCodes.UNAUTHORIZED, "Invalid Token!", {
        error: [innerMessage],
      });
    }
    return responseProvider(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Something went wrong",
      null
    );
  };
};

const syntaxErrorHandler = (): ErrorRequestHandler => {
  return (err: unknown, _: Request, res: Response, next: NextFunction) => {
    const responseProvider = ResponseProvider(res);

    if (err instanceof SyntaxError) {
      return responseProvider(StatusCodes.BAD_REQUEST, "Invalid JSON", null);
    } else {
      return next(err);
    }
  };
};

export default {
  notFoundHandler,
  clientErrorHandler,
  errorHandler,
  syntaxErrorHandler,
};
