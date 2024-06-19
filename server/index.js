const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const user = require('./Controller/userController');
const pool = require('./configDB/configDB.js');

// Ruta para obtener todos los usuarios
app.get("/todos-los-Usuarios", async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [result] = await connection.query("SELECT * FROM usuario");
        connection.release();
        res.send(result);
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        res.status(500).send('Error interno del servidor');
    }
});

app.post('/registro-usuario', user.register);
app.post('/login', user.login);

const PORT = 3001;
app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto", PORT);
});
