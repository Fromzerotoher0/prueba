import { Request, Response, NextFunction } from 'express';
import httpException from '../helpers/httpException';

function ErrorHandler(
  err: httpException,
  request: Request,
  response: Response,
  next: NextFunction
) {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';

  return response.status(status).json({
    error: err,
    status,
    message,
    stack: err.stack,
  });
}

export default ErrorHandler;
