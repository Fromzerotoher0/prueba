import { NextFunction, Request, Response } from 'express';
import { register, login } from './user.ops';

export const registerController = async (
  request: Request,
  response: Response,
  next: any
): Promise<Response> => {
  try {
    const user = request.body.user;
    const password = request.body.pass;
    const result = await register(user, password);
    return response.status(200).json({
      result,
    });
  } catch (error) {
    return next(error);
  }
};

export const loginController = async (
  request: Request,
  response: Response,
  next: any
): Promise<Response> => {
  try {
    const user = request.body.user;
    const password = request.body.pass;
    const result = await login(user, password);
    return response.status(200).json({
      result,
    });
  } catch (error) {
    return next(error);
  }
};
