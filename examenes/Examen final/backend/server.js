const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Conexión a la base de datos
const db = new sqlite3.Database('./agenda.db', (err) => {
  if (err) console.error(err.message);
  else console.log('Conectado a la base de datos SQLite');
});

// Ruta de registro
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);

  db.run(
    'INSERT INTO usuarios(email, password) VALUES(?, ?)',
    [email, hash],
    function (err) {
      if (err) return res.json({ success: false, message: 'Correo ya registrado' });
      res.json({ success: true, userId: this.lastID });
    }
  );
});

// Ruta de login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.get('SELECT * FROM usuarios WHERE email = ?', [email], async (err, user) => {
    if (err) return res.json({ success: false, message: 'Error en la DB' });
    if (!user) return res.json({ success: false, message: 'Usuario no encontrado' });

    const match = await bcrypt.compare(password, user.password);
    if (match) res.json({ success: true, userId: user.id });
    else res.json({ success: false, message: 'Contraseña incorrecta' });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
