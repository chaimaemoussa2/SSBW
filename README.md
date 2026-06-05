# SSBW - Tienda Prado Clone

Aplicación web de tienda online basada en el Museo del Prado, desarrollada como proyecto del Máster en Ingeniería Informática.

## Estructura del proyecto

SSBW/
├── routes/          # Rutas Express (productos, usuarios, API)
├── views/           # Plantillas Nunjucks
├── prisma/          # Schema y migraciones de base de datos
├── imagenes/        # Imágenes de productos
├── web/             # Frontend React + Vite + Tailwind (Tareas 9 y 10)
├── astro/           # Sitio estático Astro (Tareas 11 y 12)
├── docker-compose.yml          # Docker para desarrollo
├── docker-compose-prod.yml     # Docker para producción
├── Dockerfile                  # Contenedor de la app
└── Caddyfile                   # Configuración del proxy inverso

## Requisitos
- Node.js
- Docker Desktop

---

## Tienda Express (localhost:3000)

### Opción 1 - Restaurar base de datos desde backup
1. Abrir Docker Desktop
2. Ejecutar `docker compose up -d`
3. Ejecutar `npm install`
4. Ejecutar `npx prisma generate`
5. Restaurar la base de datos:
   `Get-Content backup_ssbw.sql | docker exec -i ssbw_postgres psql -U yo -d ssbw`
6. Ejecutar `npm run dev`

### Opción 2 - Recrear la base de datos desde cero
1. Ejecutar `docker compose up -d`
2. Ejecutar `npm install`
3. Ejecutar `npx prisma generate`
4. Ejecutar `npx prisma migrate dev`
5. Ejecutar `node seed.ts`
6. Ejecutar `node registra_usuarios.ts`
7. Ejecutar `npm run dev`

### Abrir la tienda
http://localhost:3000

### Usuarios de prueba
- admin@ssbw.com / 1234
- user@ssbw.com / 1234

### Pruebas de la API
Usar el archivo `test-api.http` con la extensión REST Client de VS Code.

---

## App React + Vite (localhost:5173) — Tareas 9 y 10

1. Abrir una nueva terminal
2. Ejecutar `cd web`
3. Ejecutar `npm install`
4. Ejecutar `npm run dev`
5. Abrir http://localhost:5173

### Páginas
- `/` — Portada con tabs DaisyUI
- `/galeria` — Galería de perros y cuadros aleatorios
- `/carousel` — Carousel de obras de arte

---

## Sitio Astro (localhost:4321) — Tareas 11 y 12

1. Abrir una nueva terminal
2. Ejecutar `cd astro`
3. Ejecutar `npm install`
4. Ejecutar `npm run dev`
5. Abrir http://localhost:4321

### Páginas
- `/` — Portada con tabs
- `/carrousel` — Carousel de obras (React island)
- `/ssg` — Destacados con SSG (12 productos)
- `/productos/[titulo]` — Detalle de cada producto

---

## Despliegue en producción — Tarea 13

docker compose -f docker-compose-prod.yml up -d

Servicios:
- db — PostgreSQL
- tienda-prado — App Node.js
- caddy — Proxy inverso en puerto 80

---

## Ramas
- `hito1` — Tareas 1-7
- `hito2` — Tareas 8 y 9
- `hito3` — Tareas 10, 11, 12 y 13