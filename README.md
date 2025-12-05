# AgendaWeb – Sistema de Agenda y Recordatorios Online

AgendaWeb es una aplicación web simple que permite gestionar tareas personales: crear, editar, eliminar y marcar como completadas.  
Está diseñada como proyecto académico para practicar desarrollo web (frontend, backend, bases de datos y despliegue).

## 🚀 Funcionalidades

- Registro e inicio de sesión
- Gestión completa de tareas (CRUD)
- Asignación de fecha y prioridad
- Marca de tareas completadas
- Panel limpio y responsivo

## 🛠 Tecnologías

### Frontend

- HTML5
- CSS3
- JavaScript Vanilla

### Backend

- Node.js + Express.js

### Base de Datos

- SQLite (local y ligera)

## 📁 Contenido del repositorio

- `/frontend` → Interfaz del usuario
- `/backend` → API REST con Express
- `/sql` → Modelo de datos + script SQL
- `DOCUMENTACION_TECNICA.md` → Documento técnico del proyecto

## 🅐 **Definición del Problema y Solución**

------

### **1. El Problema**

Las personas manejan múltiples tareas diarias pero:

- No quieren instalar aplicaciones pesadas.
- Olvidan compromisos importantes.
- Necesitan algo simple, rápido y accesible desde cualquier dispositivo.

**Dolor identificado:**
 Falta de una agenda digital **minimalista**, que no requiera instalación y funcione desde cualquier navegador.

------

### **2. La Solución: AgendaWeb**

AgendaWeb es una **aplicación web ligera** que permite:

- Registro e inicio de sesión.
- Crear, editar y eliminar tareas.
- Asignar fecha, prioridad y marcar tareas como completadas.
- Ver todo en un panel organizado.

Solución simple y funcional para cualquier usuario que busca productividad sin complicaciones.

------

### **3. Justificación**

AgendaWeb aporta valor porque:

- ✔ 100% accesible (solo navegador).
- ✔ Extremadamente ligera y rápida.
- ✔ Ideal para estudiantes o profesionales.
- ✔ Enfoque minimalista, sin distracciones.

**Innovación:**
 La simplicidad y accesibilidad universal lo hacen ideal para aprendizaje y uso real.

------

# 🅑 **Propuesta Técnica (Arquitectura)**

------

## **1. Comparativa de Tecnologías de Frontend**

| Tecnología                | Ventajas                             | Desventajas              | ¿Se eligió? |
| ------------------------- | ------------------------------------ | ------------------------ | ----------- |
| React                     | Popular, componentes, gran comunidad | Curva de aprendizaje     | ❌ No        |
| Vue.js                    | Fácil de aprender, sintaxis clara    | Comunidad menor          | ❌ No        |
| Angular                   | Fuerte, escalable                    | Complejo y pesado        | ❌ No        |
| **HTML, CSS, JS Vanilla** | Simple, ligero, ideal para prototipo | No usa framework moderno | ✔ **Sí**    |

**Motivo de elección:**
 El proyecto busca enseñar fundamentos web. Usar Vanilla JS evita complejidad innecesaria.

------

## **2. Backend y Publicación**

### Comparativa

| Opción Backend        | Ventajas                      | Desventajas      | Elección      |
| --------------------- | ----------------------------- | ---------------- | ------------- |
| Node.js + Express     | Rápido, moderno, API sencilla | Requiere npm     | ✔ **Elegido** |
| PHP                   | Muy compatible con hosting    | Menos moderno    | Alternativa   |
| Python (Flask/Django) | Potente                       | Hosting más caro | No            |

------

### **Tecnologías elegidas**

- **Backend:** Node.js + Express
- **Frontend hosting:** GitHub Pages / Netlify
- **Backend hosting:** Render / Railway
- **Base de datos:** SQLite (archivo incluido en backend)

------

## **3. Persistencia de Datos**

### Comparación SQL vs NoSQL

| Tipo    | Ventajas                                 | Desventajas           |
| ------- | ---------------------------------------- | --------------------- |
| **SQL** | Integridad, estructura clara, relaciones | Requiere esquema      |
| NoSQL   | Flexible, dinámico                       | No asegura relaciones |

### **Base de Datos Elegida: SQLite (SQL)**

Justificación:
 Datos pequeños, relaciones claras (Usuario → Tareas), fácil de usar sin servidor adicional.

------

### **Diagrama de Base de Datos (Modelo Relacional)**

```
┌──────────────┐      1 ──────── *      ┌──────────────┐
│   usuarios   │ ----------------------> │    tareas    │
├──────────────┤                         ├──────────────┤
│ id (PK)      │                         │ id (PK)      │
│ email        │                         │ usuario_id(FK)│
│ password     │                         │ descripcion  │
└──────────────┘                         │ fecha        │
                                          │ prioridad    │
                                          │ completada   │
                                          └──────────────┘
```

------

# 🅒 **Diseño de API (Interfaz de Programación)**

*(Formato basado en ANEXO 1)*

------

## **1. POST /register – Registrar usuario**

**URL:** `/register`
 **Método:** POST

### **Body (JSON)**

```
{
  "email": "usuario@gmail.com",
  "password": "1234"
}
```

### **Respuesta**

```
{
  "success": true,
  "userId": 1
}
```

------

## **2. POST /login – Inicio de sesión**

**URL:** `/login`
 **Método:** POST

### **Body**

```
{
  "email": "usuario@gmail.com",
  "password": "1234"
}
```

### **Respuesta**

```
{
  "success": true,
  "userId": 1
}
```

------

## **3. POST /tareas – Crear tarea**

**URL:** `/tareas`
 **Método:** POST

### **Body**

```
{
  "usuario_id": 1,
  "descripcion": "Estudiar para el examen",
  "fecha": "2025-02-10",
  "prioridad": "alta"
}
```

### **Respuesta**

```
{
  "success": true,
  "message": "Tarea creada"
}
```

------

# 🅓 **Planificación y Costos**

------

## **1. Estimación de Esfuerzo**

| Actividad             | Horas        |
| --------------------- | ------------ |
| Análisis y requisitos | 4 h          |
| Diseño UI             | 5 h          |
| Frontend              | 10 h         |
| Backend (API)         | 12 h         |
| Base de datos         | 4 h          |
| Integración           | 6 h          |
| Pruebas               | 4 h          |
| Documentación + Video | 5 h          |
| **Total**             | **50 horas** |

------

## **2. Presupuesto**

**Costo por hora:** Q. 50
 **Horas totales:** 50

### **Costo total:**

```
50 h × Q. 50/h = Q. 2,500
```