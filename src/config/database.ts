import mysql from 'mysql';

//connection to the database
export const connection = mysql.createConnection({
    host: "mysql-anderson.alwaysdata.net",
    user: "anderson",
    password: "16aa3240e",
    database: "anderson_alumnos",
  });
  
  connection.connect((error:Error) => {
    if (error) {
      console.log("error de conexión : " + error);
      return;
    }
    console.log("conexión exitosa");
  });
  
  export default connection;