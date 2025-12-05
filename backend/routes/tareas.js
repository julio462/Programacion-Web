const express = require("express");
const router = express.Router();
const db = require("../db");

// Obtener tareas por usuario
router.get("/:usuario_id", (req, res) => {
    const { usuario_id } = req.params;

    const sql = "SELECT * FROM tareas WHERE usuario_id = ? ORDER BY fecha ASC";

    db.all(sql, [usuario_id], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Crear tarea
router.post("/", (req, res) => {
    const { usuario_id, descripcion, fecha, prioridad } = req.body;

    const sql = `
        INSERT INTO tareas (usuario_id, descripcion, fecha, prioridad, completada)
        VALUES (?, ?, ?, ?, 0)
    `;

    db.run(sql, [usuario_id, descripcion, fecha, prioridad], function(err) {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ mensaje: "Tarea creada", id: this.lastID });
    });
});

// Editar tarea
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { descripcion, fecha, prioridad, completada } = req.body;

    const sql = `
        UPDATE tareas SET descripcion=?, fecha=?, prioridad=?, completada=?
        WHERE id=?
    `;

    db.run(sql, [descripcion, fecha, prioridad, completada, id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: "Tarea actualizada" });
    });
});

// Eliminar tarea
router.delete("/:id", (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM tareas WHERE id=?";

    db.run(sql, [id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: "Tarea eliminada" });
    });
});

module.exports = router;
