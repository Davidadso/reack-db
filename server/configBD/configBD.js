const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: "sql10.freemysqlhosting.net",
    user: "sql10716371",
    password: "G6sRGj5gus",
    database: "sql10716371",
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection()
    .then(connection => {
        console.log("Conexión exitosa");
        connection.release(); // Liberar la conexión de prueba
    })
    .catch(error => {
        console.error("Conexión fallida:", error);
    });

module.exports = pool;
