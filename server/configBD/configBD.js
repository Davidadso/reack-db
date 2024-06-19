const mysql =  require('mysql2')
const connection = mysql.createConnection({
	host: "sql10.freesqldatabase.com",
	user: "sql10714615",
	password: "wG5bxSbP44",
	database: "sql10714615",
	port: 3306,
})

connection.conect((error) =>{
	if(!error)
	   {console.log("Conexión exitosa")}
	else{ console.log("Conexión fallida")
	       }		
})

module.exports = connection

