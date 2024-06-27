const mysqlConnection = require('../configBD');

const registrarUsuario = (req, res) => {
    const { identificacion, nombres, apellidos, email, direccion, telefono, password } = req.body;
    if (!identificacion || !nombres || !apellidos || !email || !direccion || !telefono || !password) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const query = 'INSERT INTO usuario (identificacion, nombres, apellidos, email, direccion, telefono, password, estado, fecha_creacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    mysqlConnection.query(query, [identificacion, nombres, apellidos, email, direccion, telefono, password, 'activo', new Date()], (err, result) => {
        if (err) {
            console.error('Error al registrar usuario en MySQL:', err);
            return res.status(500).json({ error: 'Error al registrar usuario' });
        }
        res.status(201).json({ message: 'Usuario registrado con éxito' });
    });
};

module.exports = { registrarUsuario };
