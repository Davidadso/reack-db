const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { registrarUsuario, iniciarSesion } = require('./Controller/userController');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

// Cambia esta línea
app.post('/api/usuarios/registro', registrarUsuario);
app.post('/api/usuarios/login', iniciarSesion);

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo salió mal', details: err.message });
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});