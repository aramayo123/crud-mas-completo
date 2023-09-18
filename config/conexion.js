var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ventas'
});

con.connect(
    (err) =>{
        if(!err){
            console.log('Conexion Exitosa');
        }else{
            console.log('Error de conexion');
        }
    }
);

module.exports = con;