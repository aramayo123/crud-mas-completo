var conexion = require('../config/conexion');
var libro = require('../model/libro');
var borrar = require('fs');
module.exports = {
    index: function(req, res ){
        libro.obtener(conexion, function (err,datos){
            console.log(err);
            //console.log(datos);
            res.render('libros/index', { 
                title: 'Aplication', 
                libros: datos
            });
        });
    },
    crear: function(req, res){
        res.render('libros/crear');
    },
    guardar: function(req, res){
        //console.log(req.body);
        //console.log(req.file.filename);
        libro.insertar(conexion, req.body, req.file,function (err){
            console.log(err);
            res.redirect('/libros');
        });
    },
    eliminar: function(req, res){
        //console.log("recepcion de datos");
        //console.log(req.params.id);
        libro.retornarDatosID(conexion,req.params.id,function(error, registros){
            console.log(error);
            var nombreImagen = "public/images/"+(registros[0].imagen);
            //console.log(nombreImagen);
            if(borrar.existsSync(nombreImagen)){ // si el archivo existe
                borrar.unlinkSync(nombreImagen); // borramos 
            }
            //res.send(nombreImagen);
            libro.borrar(conexion,req.params.id,function(error){
                console.log(error);
                res.redirect('/libros');
            });
        });

    },
    editar: function(req, res){
        libro.retornarDatosID(conexion,req.params.id,function(error, registros){
            console.log(error);
            //console.log(registros[0]);
            res.render('libros/editar', { 
                libro:registros[0] 
            });
        });
    },
    actualizar: function(req,res){
        //console.log(req.body.file.filename);
        //console.log(req.body.id)
        if(req.file){// si se envio
            if(req.file.filename){ // si existe y tiene algo
                libro.retornarDatosID(conexion,req.body.id,function(error, registros){
                    console.log(error);
                    var nombreImagen = "public/images/"+(registros[0].imagen);
                    
                    if(borrar.existsSync(nombreImagen)){ // si el archivo existe
                        borrar.unlinkSync(nombreImagen); // borramos 
                    }
                    
                    libro.actualizarArchivo(conexion,req.body,req.file,function(error){
                        console.log(error);
                    });
                });
            }
        }
        if(req.body.titulo){
            libro.actualizar(conexion,req.body,function(error){ 
                console.log(error);
            });
            
        }
       
        res.redirect('/libros');
    }
}