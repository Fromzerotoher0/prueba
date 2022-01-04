import HttpException from '../../helpers/httpException';
import connection from '../../config/database';

export function create(nombre: string) {
  return new Promise((resolve, reject) => {
    connection.query(
      'select * from sede where nombre_sede = ?',
      [nombre],
      (error, results) => {
        if (results.length > 0) {
          reject(new HttpException('ya hay una sede con este nombre', 400));
        } else {
          connection.query(
            'insert into sede set ?',
            {
              nombre_sede: nombre,
            },
            (error: any, results: any) => {
              if (error == null) {
                resolve('sede creada');
              } else {
                reject(new HttpException(error, 400));
              }
            }
          );
        }
      }
    );
  });
}

export function read() {
  return new Promise((resolve, reject) => {
    connection.query(
      `Select count(*) as alumnos , s.nombre_sede , s.id_sede from alumno al 
    inner join sede s on s.id_sede = al.sede_id
    Group by  s.id_sede`,
      (error: any, results) => {
        if (error) {
          reject(new HttpException(error, 400));
        } else {
          resolve(results);
        }
      }
    );
  });
}

export function readById(id: number) {
  return new Promise((resolve, reject) => {
    connection.query(
      `select * from sede where id_sede = ?`,
      [id],
      (error: any, results) => {
        if (error) {
          reject(new HttpException(error, 400));
        } else {
          resolve(results);
        }
      }
    );
  });
}

export function remove(id: number) {
  return new Promise((resolve, reject) => {
    connection.query(
      `select * from alumno a
    inner join sede s on a.sede_id = s.id_sede
    where s.id_sede = ?`,
      [id],
      (error, results) => {
        if (results.length > 0) {
          reject(
            new HttpException(
              'la sede tiene alumnos inscritos , por lo tanto no se puede eliminar',
              400
            )
          );
        } else {
          connection.query(
            'delete from sede where id_sede = ?',
            [id],
            (error: any, results) => {
              if (error) {
                reject(new HttpException(error, 400));
              } else {
                resolve('sede eliminado');
              }
            }
          );
        }
      }
    );
  });
}

export function edit(id: number, nombre: string) {
  return new Promise((resolve, reject) => {
    connection.query(
      'select * from sede where id_sede = ?',
      [id],
      (error, results) => {
        if (results.length > 0) {
          connection.query(
            `update sede set nombre_sede = "${nombre}"  where id_sede = ${id}`,
            (error: any, results) => {
              if (error) {
                reject(new HttpException(error, 400));
              } else {
                resolve('sede editada');
              }
            }
          );
        } else {
          reject(new HttpException('esta sede no existe', 404));
        }
      }
    );
  });
}
