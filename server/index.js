const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const userController = require('./Controller/userController');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Rutas
app.post('/registro-usuario', userController.register);
app.post('/login', userController.login);
app.get("/todos-los-Usuarios", userController.getAllUsers);

const PORT = 3001;
app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto", PORT);
});
