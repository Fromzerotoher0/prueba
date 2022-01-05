import HttpException from '../../helpers/httpException';
import connection from '../../config/database';

export function create(
  nombre: string,
  apellido: string,
  sexo: string,
  fechaNacimiento: string,
  foto: string,
  sede: string
) {
  return new Promise((resolve, reject) => {
    connection.query(
      'select alumnos from sede where nombre_sede = ?',
      [sede],
      (error, results) => {
        let alumnos = results[0].alumnos + 1;
        connection.query(
          'update sede set alumnos = ? where nombre_sede = ?',
          [alumnos,sede],
          (error, results) => {
            connection.query(
              'select id_sede from sede where nombre_sede = ?',
              [sede],
              (error, results) => {
                let id = results[0].id_sede;
                connection.query(
                  'insert into alumno set ?',
                  {
                    nombre: nombre,
                    apellido: apellido,
                    sexo: sexo,
                    fechaNacimiento: fechaNacimiento,
                    foto: foto,
                    sede_id: id,
                  },
                  (error: any, results: any) => {
                    if (error == null) {
                      resolve('alumno creado');
                    } else {
                      reject(new HttpException(error, 400));
                    }
                  }
                );
              }
            );
          }
        );
      }
    );
  });
}

export function read() {
  return new Promise((resolve, reject) => {
    connection.query(
      'select * from alumno a INNER JOIN sede s on s.id_sede = a.sede_id',
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
      'select * from alumno where id = ?',
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

export function readBySede(sede: any) {
  return new Promise((resolve, reject) => {
    if (sede == 'todas las sedes') {
      connection.query(
        'select * from alumno a INNER JOIN sede s on s.id_sede = a.sede_id',
        (error: any, results) => {
          if (error) {
            reject(new HttpException(error, 400));
          } else {
            resolve(results);
          }
        }
      );
    } else {
      connection.query(
        'select id_sede from sede where nombre_sede = ?',
        [sede],
        (error, results) => {
          let id = results[0].id_sede;
          connection.query(
            `select * from alumno a
          inner join sede s on s.id_sede = a.sede_id
          where a.sede_id = ?`,
            [id],
            (error: any, results) => {
              if (error) {
                reject(new HttpException(error, 400));
              } else {
                resolve(results);
              }
            }
          );
        }
      );
    }
  });
}

export function remove(id: number) {
  return new Promise((resolve, reject) => {
    connection.query(
      'delete from alumno where id = ?',
      [id],
      (error: any, results) => {
        if (error) {
          reject(new HttpException(error, 400));
        } else {
          resolve('usuario eliminado');
        }
      }
    );
  });
}

export function edit(id: number, nombre: string, apellido: string) {
  return new Promise((resolve, reject) => {
    connection.query(
      'select * from alumno where id = ?',
      [id],
      (error, results) => {
        if (results.length > 0) {
          connection.query(
            `update alumno set nombre = "${nombre}" , apellido = "${apellido}" where id = ${id}`,
            (error: any, results) => {
              if (error) {
                reject(new HttpException(error, 400));
              } else {
                resolve('usuario editado');
              }
            }
          );
        } else {
          reject(new HttpException('este usuario no existe', 404));
        }
      }
    );
  });
}
