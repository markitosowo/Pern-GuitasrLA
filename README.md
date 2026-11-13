# PERNGuitarsLA — API REST de GuitarsLA

API en **Node.js + Express + Sequelize + PostgreSQL** (TypeScript) que guarda y entrega el catálogo de guitarras del proyecto React **GuitarsLA-ts**. Solo implementa **crear (POST)** y **leer (GET)**.

## Tecnologías

| Tecnología | Uso |
|---|---|
| Express 5 | Servidor y rutas |
| Sequelize 6 + `pg` | ORM y conexión a PostgreSQL |
| `cors` | Permite que React (otro puerto) consuma la API |
| `dotenv` | Variables de entorno desde `.env` |
| TypeScript + `tsx` | Tipado y ejecución en desarrollo |

## Requisitos

- Node.js 18 o superior
- PostgreSQL instalado y corriendo

## Instalación y ejecución

### 1. Clonar e instalar dependencias

```bash
git clone https://github.com/<tu-usuario>/PERNGuitarsLA.git
cd PERNGuitarsLA
npm install
```

### 2. Crear la base de datos

Desde `psql` (o pgAdmin):

```sql
CREATE DATABASE guitarsla;
```

La tabla `guitars` **se crea sola** al arrancar el servidor (`sequelize.sync()`).

### 3. Variables de entorno

```bash
cp .env.example .env
```

Edita `.env` con tus datos de PostgreSQL:

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=guitarsla
DB_USER=postgres
DB_PASSWORD=tu_password

PORT=4000
CLIENT_URL=http://localhost:5173
```

| Variable | Descripción |
|---|---|
| `DB_HOST`, `DB_PORT` | Dónde corre PostgreSQL |
| `DB_NAME` | Nombre de la base de datos (`guitarsla`) |
| `DB_USER`, `DB_PASSWORD` | Credenciales de PostgreSQL |
| `PORT` | Puerto de la API (opcional, por defecto `4000`) |
| `CLIENT_URL` | Origen permitido por CORS: la URL del frontend (opcional, por defecto `http://localhost:5173`) |

> El archivo `.env` está en `.gitignore`: no lo subas a GitHub.

### 4. Cargar el catálogo inicial (opcional)

```bash
npm run seed
```

Inserta las 12 guitarras originales si la tabla está vacía.

### 5. Arrancar el servidor

```bash
npm run dev
```

Debe mostrar `API escuchando en http://localhost:4000`.

### Scripts

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor en modo desarrollo (se reinicia al guardar cambios) |
| `npm run seed` | Carga las guitarras iniciales |
| `npm run build` | Compila TypeScript a `dist/` |
| `npm start` | Ejecuta la versión compilada (`dist/index.js`) |

## Base de datos

Tabla `guitars`:

| Columna | Tipo | Reglas |
|---|---|---|
| `id` | INTEGER | Clave primaria, autoincremental |
| `name` | VARCHAR(120) | Obligatorio |
| `image` | VARCHAR(100) | Obligatorio (nombre del archivo en `public/img` del frontend, ej. `guitarra_01`) |
| `description` | TEXT | Obligatorio |
| `price` | DECIMAL(10,2) | Obligatorio, mayor a 0 |

## Endpoints

Base: `http://localhost:4000/api/guitars`

### `GET /api/guitars`

Devuelve todas las guitarras ordenadas por `id`.

```json
[
  { "id": 1, "name": "Lukather", "image": "guitarra_01", "description": "...", "price": 299 }
]
```

### `POST /api/guitars`

Registra una guitarra.

```json
{ "name": "Telecaster", "image": "guitarra_05", "description": "Sonido brillante", "price": 450 }
```

| Código | Cuándo |
|---|---|
| `201` | Guitarra creada (devuelve el registro con su `id`) |
| `400` | Validación fallida: `{ "errors": ["El nombre es obligatorio", ...] }` |
| `500` | Error del servidor o de la base de datos |

**Validaciones:** `name`, `image` y `description` deben ser texto no vacío; `price` debe ser un número mayor a 0.

### Probar con curl

```bash
curl http://localhost:4000/api/guitars

curl -X POST http://localhost:4000/api/guitars \
  -H "Content-Type: application/json" \
  -d '{"name":"Telecaster","image":"guitarra_05","description":"Sonido brillante","price":450}'
```

## CORS

En `src/server.ts` el middleware `cors` solo acepta peticiones desde `CLIENT_URL` (por defecto `http://localhost:5173`, el puerto de Vite) y los métodos `GET` y `POST`.

## Estructura

```
PERNGuitarsLA/
├── src/
│   ├── config/db.ts               # Conexión de Sequelize a PostgreSQL
│   ├── models/Guitar.model.ts     # Modelo / tabla guitars
│   ├── middleware/validateGuitar.ts # Validaciones del POST
│   ├── handlers/guitars.ts        # Controladores: getGuitars y createGuitar
│   ├── data/guitars.ts            # Datos del seed
│   ├── router.ts                  # Rutas GET y POST
│   ├── server.ts                  # Express + CORS + rutas
│   ├── seed.ts                    # Script de carga inicial
│   └── index.ts                   # Arranque: conecta, sincroniza y escucha
├── .env.example
├── package.json
└── tsconfig.json
```

## Integración con el frontend

1. Arranca esta API (`npm run dev`, puerto 4000).
2. En el proyecto **GuitarsLA-ts** configura `VITE_API_URL=http://localhost:4000/api` y ejecuta `npm run dev` (puerto 5173).
# Pern-GuitasrLA
