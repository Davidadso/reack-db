const pool = require('../configBD');
const bcrypt = require('bcrypt');

const registrarUsuario = async (req, res) => {
    const { identificacion, nombres, apellidos, email, direccion, telefono, password } = req.body;
    
    console.log('Datos recibidos:', req.body);

    if (!identificacion || !nombres || !apellidos || !email || !direccion || !telefono || !password) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Intentando insertar usuario en la base de datos');
        const query = 'INSERT INTO usuario (identificacion, nombres, apellidos, email, direccion, telefono, password, estado, fecha_creacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const [result] = await pool.execute(query, [identificacion, nombres, apellidos, email, direccion, telefono, hashedPassword, 'activo', new Date()]);
        
        console.log('Usuario insertado:', result);
        res.status(201).json({ message: 'Usuario registrado con éxito' });
    } catch (error) {
        console.error('Error detallado al registrar usuario:', error);
        res.status(500).json({ error: 'Error al registrar usuario', details: error.message });
    }
};

const iniciarSesion = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email y contraseña son obligatorios' });
    }

    try {
        const [users] = await pool.execute('SELECT * FROM usuario WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const user = users[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        delete user.password;
        res.status(200).json({ message: 'Inicio de sesión exitoso', user });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = { registrarUsuario, iniciarSesion };