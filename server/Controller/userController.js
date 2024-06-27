const pool = require('../configBD');
const bcrypt = require('bcrypt');

const registrarUsuario = async (req, res) => {
    const { identificacion, nombres, apellidos, email, direccion, telefono, password } = req.body;
    
    if (!identificacion || !nombres || !apellidos || !email || !direccion || !telefono || !password) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO usuario (identificacion, nombres, apellidos, email, direccion, telefono, password, estado, fecha_creacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const [result] = await pool.execute(query, [identificacion, nombres, apellidos, email, direccion, telefono, hashedPassword, 'activo', new Date()]);
        
        res.status(201).json({ message: 'Usuario registrado con éxito' });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ error: 'Error al registrar usuario' });
    }
};

module.exports = { registrarUsuario };