import { NextFunction, Request, Response } from 'express';
import { create, read, remove, edit } from './sede.ops';

export const createController = async (
  request: Request,
  response: Response,
  next: any
): Promise<Response> => {
  try {
    const nombre = request.body.nombre;
    const result = await create(nombre);
    return response.status(200).json({
      result,
    });
  } catch (error) {
    return next(error);
  }
};

export const readController = async (
  request: Request,
  response: Response,
  next: any
): Promise<Response> => {
  try {
    const result = await read();
    return response.status(200).json({
      result,
    });
  } catch (error) {
    next(error);
  }
};

export const removeController = async (
  request: Request,
  response: Response,
  next: any
): Promise<Response> => {
  try {
    const id = request.body.id;
    const result = await remove(id);
    return response.status(200).json({
      result,
    });
  } catch (error) {
    next(error);
  }
};

export const editController = async (
  request: Request,
  response: Response,
  next: any
): Promise<Response> => {
  try {
    const id = request.body.id;
    const nombre = request.body.nombre;
    const result = await edit(id, nombre);
    return response.status(200).json({
      result,
    });
  } catch (error) {
    next(error);
  }
};
