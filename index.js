const express = require('express');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());


const users = [];


app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    
    if (users.find(user => user.username === username)) {
      return res.status(409).json({ error: 'El usuario ya existe' });
    }

    // Generar un salt aleatorio
    const salt = await bcrypt.genSalt(10);

    // Crear el hash de la contraseña utilizando el salt generado
    const hashedPassword = await bcrypt.hash(password, salt);

    // Almacenar el usuario en memoria (reemplazar con la lógica de almacenamiento adecuada)
    users.push({ username, password: hashedPassword });

    res.status(201).json({ message: 'Registro exitoso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Ruta de autenticación de usuario
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Buscar el usuario en la memoria
    const user = users.find(user => user.username === username);

    
    if (!user) {
      return res.status(401).json({ error: 'Usuario no existe' });
    }

    // Verifica la contraseña utilizando el hash almacenado y el salt
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    res.json({ message: 'Inicio de sesión exitoso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});


app.listen(3000, () => {
  console.log('Servidor iniciado en http://localhost:3000');
});
