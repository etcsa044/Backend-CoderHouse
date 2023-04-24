import multer from "multer";
import __dirname from "../utils.js";


//Definir donde se va a almacenar TODO:

const storage = multer.diskStorage({
    // ubicancion de destino del archivo:
    destination:function(req,file,cb){
        // adicionalemente se pueden separar archivos a carpetas usando: if(file.mimetype == "extension"){}
        cb(null,`${__dirname}/public/img`);
    },
    // nombre del Archivo - en este caso con un TimeStamp:
    filename: function(req,file, cb){
        cb(null, `${Date.now()}-${file.originalname}`);
    }       
})

const uploader = multer({storage});

export default uploader;