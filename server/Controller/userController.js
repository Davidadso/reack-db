const pool = require('../configDB/configDB.js');

const controller = {
    register: async function (req, res) {
        const { identificacion, nombres, apellidos, email, direccion, telefono, password } = req.body;

        if (!identificacion || !nombres || !apellidos || !email || !direccion || !telefono || !password) {
            return res.status(400).send('Todos los campos son obligatorios');
        }

        try {
            const connection = await pool.getConnection();

            // Verificar si el email ya existe
            const [existingUser] = await connection.query('SELECT * FROM usuario WHERE email = ?', [email]);
            if (existingUser.length > 0) {
                connection.release();
                return res.status(400).send("El email ya existe");
            }

            // Insertar el nuevo usuario
            await connection.query(
                'INSERT INTO usuario (identificacion, nombres, apellidos, email, direccion, telefono, password, estado, fecha_creación) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [identificacion, nombres, apellidos, email, direccion, telefono, password, "activo", new Date()]
            );

            connection.release();
            res.status(200).send('Usuario creado con éxito');
        } catch (error) {
            console.error('Error al registrar el usuario:', error);
            res.status(500).send('Error interno del servidor');
        }
    },

    login: async function (req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send('Email y contraseña son obligatorios');
        }

        try {
            const connection = await pool.getConnection();
            const [user] = await connection.query('SELECT * FROM usuario WHERE email = ? AND password = ?', [email, password]);
            connection.release();

            if (user.length > 0) {
                return res.status(200).json({ message: "Autenticación exitosa", user: user[0] });
            } else {
                return res.status(400).json({ message: "Credenciales incorrectas" });
            }
        } catch (error) {
            console.error('Error al procesar el inicio de sesión:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },

    getAllUsers: async function (req, res) {
        try {
            const connection = await pool.getConnection();
            const [result] = await connection.query("SELECT * FROM usuario");
            connection.release();
            res.send(result);
        } catch (error) {
            console.error('Error al obtener los usuarios:', error);
            res.status(500).send('Error interno del servidor');
        }
    }
};

module.exports = controller;
