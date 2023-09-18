var express = require('express');
var router = express.Router();
const librosController = require('../controllers/librosController');
var multer = require('multer'); // libreria para guardar archivos
var fecha = Date.now();// obtenemos la fecha y hora actual para no sobreescribir las imagenes
//con esto controlamos la ruta de las imagenes
var rutaAlmacen = multer.diskStorage({
    destination: function (request, file, callback){
        callback(null,'./public/images/');
    },
    filename: function(request, file, callback){
        //console.log(file);
        callback(null,fecha+"_"+file.originalname);
    }
});

var cargar = multer({ storage: rutaAlmacen });

/* GET home page. */
router.get('/',librosController.index);
router.get('/crear',librosController.crear);
router.post('/',cargar.single("imagen"),librosController.guardar);
router.post('/eliminar/:id',librosController.eliminar);
router.get('/editar/:id',librosController.editar);
router.post('/actualizar',cargar.single("imagen"),librosController.actualizar);

module.exports = router;
