const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { registrarUsuario } = require('./Controller/userController');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

app.post('/registro-usuario', (req, res) => {
    console.log('Solicitud recibida en /registro-usuario');
    console.log('Cuerpo de la solicitud:', req.body);
    registrarUsuario(req, res);
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});