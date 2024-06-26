const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const { registrarUsuario, iniciarSesion } = require('./Controller/userController');
const path = require('path');
const PORT = process.env.PORT || 3001;



app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.post('/registro', registrarUsuario);
app.post('/login', iniciarSesion);

const user = require('./Controller/userController');

app.get("/", (req, res) => {
    let config = {
      method: "GET",
      maxBodyLength: Infinity,
      url: 'https://api.jsonbin.io/v3/b/664e4495e41b4d34e4f7d7f2',
      headers: {
        'Content-Type': 'application/json',
        "X-Master-Key": "$2a$10$/mcvIEltjOIKAA3.1TkrE.D1nJgzbo5AigxCM0BKZOSh5HXm2.9o2"
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

//Solicitamos la conexión a la BD
const conexion = require('./configBD.js');

app.get("/todos-los-Usuarios", (req, res) => {
conexion.connect(function (err) {
if (err) throw err;
//Select all customers and return the result object:
conexion.query("SELECT * FROM sql10716371.usuario", function (err, result, fields) {
if (err) throw err;
res.send(result)
});
});
})


// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Handle any other requests by returning the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});




app.post('/registro-usuario', user.register);
app.post('/login', user.login);


app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto ", PORT);
});