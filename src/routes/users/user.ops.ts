import jwt from 'jsonwebtoken';
import CryptoJS from 'crypto-js';
import HttpException from '../../helpers/httpException';
import connection from '../../config/database';

export function register(user: string, password: string) {
  return new Promise(async (resolve, reject) => {
    let passHash = CryptoJS.AES.encrypt(password, 'prueba').toString();
    connection.query(
      'select * from usuarios where usuario = ?',
      [user],
      (error: any, results: any) => {
        if (results.length > 0) {
          reject(new HttpException('este usuario ya esta registrado', 400));
        } else {
          connection.query(
            'insert into usuarios set ?',
            {
              usuario: user,
              contraseña: passHash,
            },
            (error: any, results: any) => {
              if (error == null) {
                resolve('usuario creado');
              } else {
                reject(error);
              }
            }
          );
        }
      }
    );
  });
}

export function login(user: string, password: string) {
  return new Promise(async (resolve, reject) => {
    connection.query(
      'select * from usuarios where usuario = ?',
      [user],
      (error: any, results: any) => {
        if (results.length > 0) {
          const decryptPassword = CryptoJS.AES.decrypt(
            results[0].contraseña,
            'prueba'
          );
          const utf8 = decryptPassword.toString(CryptoJS.enc.Utf8);
          if (results.length == 0 || password !== utf8) {
            reject(
              new HttpException('usuario y/o contraseña incorrectos', 400)
            );
          } else {
            const token = jwt.sign(
              {
                usuario: results[0].usuario,
              },
              'prueba',
              {
                expiresIn: '1d',
              }
            );
            resolve({ msg: 'inicio de sesión exitoso', token });
          }
        } else {
          reject(new HttpException('usuario y/o contraseña incorrectos', 400));
        }
      }
    );
  });
}
