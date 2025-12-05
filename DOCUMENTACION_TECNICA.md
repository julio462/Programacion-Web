
---

# 📄 **2. DOCUMENTACION_TECNICA.md** 

```markdown
# Documentación Técnica – AgendaWeb

## 1. Arquitectura del Sistema
El sistema utiliza una arquitectura Cliente-Servidor con patrón MVC.

**Frontend** → HTML, CSS, JS  
**Backend** → Node.js + Express (API REST)  
**BD** → SQLite

## 2. Modelo de Datos

### Tabla usuarios
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | INTEGER PK | Identificador |
| email | TEXT UNIQUE | Correo del usuario |
| password | TEXT | Contraseña en hash bcrypt |

### Tabla tareas
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | INTEGER PK |
| usuario_id | INTEGER FK usuarios(id) |
| descripcion | TEXT |
| fecha | DATE |
| prioridad | TEXT |
| completada | BOOLEAN |

El diagrama se encuentra en `/sql/modelo_datos.png`.

## 3. Endpoints API

### Autenticación

```
