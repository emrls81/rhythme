Here's a full README.md tailored for your repository, reflecting its MERN stack architecture and current implementation details:

---

# RhythMe

Proyecto Final para Diseño Web II

RhythMe es una red social musical construida con el stack MERN (MongoDB, Express.js, React, Node.js). Permite a los usuarios registrarse, iniciar sesión, compartir publicaciones sobre música, interactuar con otros usuarios y explorar contenido musical.

## Tabla de Contenidos

- [Características Principales](#características-principales)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación y Ejecución](#instalación-y-ejecución)
- [Rutas Principales (Backend)](#rutas-principales-backend)
- [Scripts Útiles](#scripts-útiles)
- [Licencia](#licencia)

---

## Características Principales

- Registro e inicio de sesión de usuarios con autenticación segura
- Publicaciones estilo "feed" y "stories" para compartir experiencias musicales
- Interacción mediante likes, comentarios y seguimiento a usuarios
- Interfaz de usuario moderna y responsiva usando React + Vite
- Backend robusto con Express.js y MongoDB, siguiendo buenas prácticas de seguridad

## Tecnologías Utilizadas

- **Frontend:** React, Vite, CSS
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Autenticación:** JWT, Bcrypt
- **Herramientas Adicionales:** ESLint, Helmet, Morgan, CORS, dotenv

## Estructura del Proyecto

```
rhythme/
│
├── back/               # Código fuente del backend
│   ├── controllers/    # Lógica de controladores (ej. auth)
│   ├── dbConnect/      # Conexión a MongoDB
│   ├── models/         # Modelos de datos (ej. usuario)
│   ├── routes/         # Definición de rutas Express
│   ├── services/       # Lógica de negocio/servicios
│   └── server.js       # Entrada principal del backend
│
├── front/              # Código fuente del frontend
│   ├── src/            # Componentes y páginas de React
│   ├── public/         # Archivos estáticos
│   ├── index.html      # HTML principal
│   └── vite.config.js  # Configuración de Vite
│
└── README.md           # Este archivo
```

## Instalación y Ejecución

### 1. Clona el repositorio

```bash
git clone https://github.com/emrls81/rhythme.git
cd rhythme
```

### 2. Configura el backend

```bash
cd back
npm install
# Crea un archivo .env y configura tus variables (ejemplo abajo)
npm start
```

**Ejemplo de .env:**
```
MONGO_URI=mongodb://localhost:27017/rhythme
JWT_SECRET=tu_secreto
```

### 3. Configura el frontend

```bash
cd ../front
npm install
npm run dev
```

Accede al frontend normalmente en `http://localhost:5173` (o el puerto que indique Vite).

## Rutas Principales (Backend)

- **Registro:** `POST /api/v1/auth/register`
- **Login:** `POST /api/v1/auth/login`
- **Obtener usuario por ID:** `GET /api/v1/users/:id`
- **Actualizar usuario:** `PUT /api/v1/users/:id`
- **Eliminar usuario:** `DELETE /api/v1/users/:id`
- **Seguir usuario:** `POST /api/v1/users/follow/:id`
- **Dejar de seguir usuario:** `POST /api/v1/users/unfollow/:id`
- **Crear post:** `POST /api/v1/posts/`
- **Actualizar usuario:** `PUT /api/v1/users/:id`
- **Obtener todos los posts:** `GET /api/v1/posts/`
- **Obtener post por ID:** `GET /api/v1/posts/:id`
- **Eliminar post:** `DELETE /api/v1/posts/:id`

(Agrega más rutas conforme crezcas el proyecto)

## Scripts Útiles

- **Backend:**
  - `npm start` (corre el servidor en `localhost:5000`)
- **Frontend:**
  - `npm run dev` (corre Vite en modo desarrollo)

## Licencia

Actualmente este proyecto no tiene una licencia asignada.

---

¿Preguntas? Abre un issue o contacta a los autores.

https://github.com/emrls81

https://github.com/jmunozc023

---
