-- Creación de tabla usuarios
CREATE TABLE usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

-- Creación de tabla tareas
CREATE TABLE tareas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER NOT NULL,
    descripcion TEXT NOT NULL,
    fecha DATE,
    prioridad TEXT CHECK(prioridad IN ('baja','media','alta')),
    completada BOOLEAN DEFAULT 0,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
