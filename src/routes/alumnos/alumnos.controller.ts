import { NextFunction, Request, Response } from 'express';
import { create, remove, read, readBySede, edit } from './alumnos.ops';

export const createController = async (
  request: Request,
  response: Response,
  next: any
): Promise<Response> => {
  try {
    const nombre = request.body.nombre;
    const apellido = request.body.apellido;
    const sexo = request.body.sexo;
    const fechaNacimiento = request.body.fechaNacimiento;
    const foto = `http://localhost:7000/public/users/${request.file.filename}`;
    const sede = request.body.sede;
    const result = await create(
      nombre,
      apellido,
      sexo,
      fechaNacimiento,
      foto,
      sede
    );
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

export const readBySedeController = async (
  request: Request,
  response: Response,
  next: any
): Promise<Response> => {
  try {
    const sede = request.body.sede;
    console.log(sede);

    const result = await readBySede(sede);
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
    console.log(id);

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
    const apellido = request.body.apellido;
    const result = await edit(id, nombre, apellido);
    return response.status(200).json({
      result,
    });
  } catch (error) {
    next(error);
  }
};
