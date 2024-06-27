const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');
const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors()); // Utiliza cors como middleware para todas las rutas

// Rutas para el controlador de usuario
const { registrarUsuario, iniciarSesion } = require('./Controller/userController');

app.post('/registro-usuario', (req, res) => {
  registrarUsuario(req, res);
});

app.post('/login', (req, res) => {
  iniciarSesion(req, res);
});

// Ruta para obtener datos de JSONBin
app.get("/data-jsonbin", (req, res) => {
  let config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: 'https://api.jsonbin.io/v3/b/6668ff29ad19ca34f877c92e',
    headers: {
      'Content-Type': 'application/json',
      "X-Master-Key": "$2a$10$/a5upKwW.VZAlpmN2zJ.y.vBK5GIMFO2zRfsgTRFVJ8GoKX5iQf0y"
    }
  };

  axios(config)
    .then(result => {
      res.send(result.data.record);
    })
    .catch(error => {
      console.error('Error fetching data from JSONBin:', error);
      res.status(500).send('Error fetching data');
    });
});

// Ruta para obtener todos los usuarios desde la base de datos
const conexion = require('./configBD');
app.get("/todos-los-usuarios", (req, res) => {
  conexion.connect(function (err) {
    if (err) {
      console.error('Error de conexión a la base de datos:', err);
      res.status(500).send('Error de conexión a la base de datos');
      return;
    }

    conexion.query("SELECT * FROM sql10716371.usuario", function (err, result, fields) {
      conexion.end(); // Cerrar la conexión después de la consulta
      if (err) {
        console.error('Error al ejecutar la consulta:', err);
        res.status(500).send('Error al ejecutar la consulta');
        return;
      }
      res.send(result);
    });
  });
});

// Servir archivos estáticos desde la carpeta 'build' de React
app.use(express.static(path.join(__dirname, 'build')));

// Manejar todas las demás solicitudes devolviendo la aplicación React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Manejo de errores 404
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Iniciar el servidor en el puerto especificado
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
