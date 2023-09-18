module.exports ={
    obtener: function(conexion, funcion){
        conexion.query("SELECT * FROM productos", funcion);
    },
    insertar: function(conexion, datos, imagen, funcion){
        conexion.query("INSERT INTO productos (titulo,imagen,descripcion,precio) VALUES (?,?,?,?)",[datos.titulo,imagen.filename,datos.descripcion,datos.precio], funcion);
    },
    retornarDatosID: function(conexion,id,funcion){
        conexion.query("SELECT * FROM productos WHERE id=?",[id], funcion);        
    },
    borrar: function(conexion,id,funcion){
        conexion.query("DELETE FROM productos WHERE id=?",[id], funcion);        
    },
    actualizar: function(conexion, datos, funcion){
        conexion.query("UPDATE productos SET titulo=?,descripcion=?,precio=? WHERE id=?",[datos.titulo,datos.descripcion,datos.precio,datos.id], funcion);
    },
    actualizarArchivo: function(conexion, datos,imagen, funcion){
        conexion.query("UPDATE productos SET imagen=? WHERE id=?",[imagen.filename,datos.id], funcion);
    }
}