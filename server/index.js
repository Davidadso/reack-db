const express = require('express');
const cors = require('cors');
const { registrarUsuario, iniciarSesion } = require('./Controllers/userController');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.post('/api/usuarios/registro', registrarUsuario);
app.post('/api/usuarios/login', iniciarSesion);

// Manejo de rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo salió mal', details: err.message });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});