const express = require('express');
const cors = require('cors');
const { registrarUsuario, iniciarSesion } = require('./Controller/usuarioController');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.post('/api/usuarios/registro', registrarUsuario);
app.post('/api/usuarios/login', iniciarSesion);

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});