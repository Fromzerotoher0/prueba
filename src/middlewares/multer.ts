import { Request } from 'express';
import HttpException from '../helpers/httpException';
import multer from 'multer';
import fs from 'fs';
// configuring the middleware to handle the images
const multerConfig = multer.diskStorage({
  // defining the destination of the image
  destination: (request: Request, file: Express.Multer.File, callback) => {
    let dirName = request.body.directorio;
    console.log(dirName);
    const directory = `public/${dirName}`;
    // create the directory if doesn't exist
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }
    // store the image in the directory
    callback(null, directory);
  },
  // define the name of the file
  filename: (request: Request, file: Express.Multer.File, callback) => {
    let name = request.body.nombre;
    let lastName = request.body.apellido;

    // Extracting the extension.
    const extension = file.mimetype.split('/')[1];
    callback(null, `ordinary-${name - lastName}-${Date.now()}.${extension}`);
  },
});

// filter for only images

const multerFilter = (
  request: Request,
  file: Express.Multer.File,
  callback: any
) => {
  if (
    file.mimetype.split('/')[1] === 'jpg' ||
    file.mimetype.split('/')[1] === 'png' ||
    file.mimetype.split('/')[1] === 'jpeg'
  ) {
    callback(null, true);
  } else {
    callback(
      new HttpException(
        'No es una imagen, por favor, solo suba archivos jpg,png o jpeg',
        404
      ),
      false
    );
  }
};

// save images
const uploadFile = multer({
  storage: multerConfig,
  fileFilter: multerFilter,
});

export { uploadFile };
