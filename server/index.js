const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

const user = require('./Controller/userController');

app.get("/", (req, res) => {
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
        });
});

app.post('/registro-usuario', user.register);
app.post('/login', user.login);

const PORT = 3001;
app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto ", PORT);
});
