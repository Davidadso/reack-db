const mysql =  require('mysql2')
const connection = mysql.createConnection({
	host: "sql10.freesqldatabase.com",
	user: "sql10713101",
	password: "Z4sqFuTBdu",
	database: "sql10713101",
	port: 3306,
})

connection.conect((error) =>{
	if(!error)
	   {console.log("Conexión exitosa")}
	else{ console.log("Conexión fallida")
	       }		
})

module.exports = connection

