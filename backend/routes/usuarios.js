const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../db");

// Registrar nuevo usuario
router.post("/registrar", (req, res) => {
    const { email, password } = req.body;

    const hash = bcrypt.hashSync(password, 10);

    const sql = "INSERT INTO usuarios (email, password) VALUES (?, ?)";

    db.run(sql, [email, hash], function(err) {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ mensaje: "Usuario registrado", id: this.lastID });
    });
});

// Login
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM usuarios WHERE email = ?";

    db.get(sql, [email], (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

        const match = bcrypt.compareSync(password, user.password);

        if (!match) return res.status(401).json({ error: "Contraseña incorrecta" });

        res.json({ mensaje: "Login exitoso", usuario_id: user.id });
    });
});

module.exports = router;
