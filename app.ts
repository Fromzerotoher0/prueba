import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import routes from './src/routes/routes';
import * as dotenv from 'dotenv';
import ErrorHandler from './src/helpers/errorHandler';
import HttpException from './src/helpers/httpException';
import connection from './src/config/database';

const app = express();

//connection to the database
connection;

// To handle the cors
app.use(cors());
// To recognize the incoming request object as a json object
app.use(express.json({ limit: '50mb' }));
// To recognize the incoming Request Object as strings or arrays.
app.use(express.urlencoded({ extended: true }));
// get the logs
app.use(morgan('dev'));
// Environment variables
dotenv.config({ path: './src/env/.env' });
//template engine
app.set('view engine', 'ejs');
//frontend routes
app.get('/', function (req, res) {
  res.render('index');
});
app.get('/register', function (req, res) {
  res.render('register');
});
app.get('/dashboard', function (req, res) {
  res.render('dashboard');
});
app.get('/alumnos', function (req, res) {
  res.render('alumnos');
});
app.get('/crearAlumno', function (req, res) {
  res.render('crearAlumno');
});
app.get('/perfil/:id', function (req, res) {
  res.render('alumno');
});
app.get('/sede/:id', function (req, res) {
  res.render('informacionSede');
});
app.get('/sede', function (req, res) {
  res.render('sede');
});
app.get('/crearSede', function (req, res) {
  res.render('crearSede');
});
//route for the multer's file uploads
app.use('/public', express.static(`${__dirname}/public`));
// Api routes

app.use('/api', routes);

// Wrong routes handler
app.all('*', (request, response, next) => {
  next(
    new HttpException(
      `no se encuentra la ruta ${request.originalUrl} en el servidor`,
      404
    )
  );
});

// Error handler
app.use(ErrorHandler);

app.listen(process.env.PORT);
console.log(`server running on port ${process.env.PORT}`);
