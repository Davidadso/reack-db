const pool = require('../configBD');

const userController = {
    register: async function (req, res) {
        const { identificacion, nombres, apellidos, email, direccion, telefono, password } = req.body;

        if (!identificacion || !nombres || !apellidos || !email || !direccion || !telefono || !password) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        try {
            const connection = await pool.getConnection();

            const [existingUser] = await connection.query('SELECT * FROM usuario WHERE email = ?', [email]);
            if (existingUser.length > 0) {
                connection.release();
                return res.status(400).json({ message: "El email ya existe" });
            }

            await connection.query(
                'INSERT INTO usuario (identificacion, nombres, apellidos, email, direccion, telefono, password, estado, fecha_creacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [identificacion, nombres, apellidos, email, direccion, telefono, password, "activo", new Date()]
            );

            connection.release();
            res.status(200).json({ message: 'Usuario creado con éxito' });
        } catch (error) {
            console.error('Error al registrar el usuario:', error);
            res.status(500).json({ message: 'Error interno del servidor', error: error.message });
        }
    },
};

module.exports = userController;
