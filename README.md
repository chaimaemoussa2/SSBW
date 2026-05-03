# Cómo ejecutar la web

## Requisitos
- Node.js
- Docker Desktop

## Opción 1 - Restaurar base de datos desde backup
1. Abrir Docker Desktop
2. Ejecutar `docker compose up -d`
3. Ejecutar `npm install`
4. Ejecutar `npx prisma generate`
5. Restaurar la base de datos:
   `Get-Content backup_ssbw.sql | docker exec -i ssbw_postgres psql -U yo -d ssbw`
6. Ejecutar `npm run dev`

## Opción 2 - Recrear la base de datos desde cero
1. Ejecutar `docker compose up -d`
2. Ejecutar `npm install`
3. Ejecutar `npx prisma generate`
4. Ejecutar `npx prisma migrate dev`
5. Ejecutar `node seed.ts`
6. Ejecutar `node registra_usuarios.ts`
7. Ejecutar `npm run dev`

## Abrir la tienda
http://localhost:3000

## Ejecutar la app React (Tarea 9)
1. Abrir una nueva terminal
2. Ejecutar `cd web`
3. Ejecutar `npm install`
4. Ejecutar `npm run dev`
5. Abrir http://localhost:5173

## Usuarios de prueba
- admin@ssbw.com / 1234
- user@ssbw.com / 1234

## Pruebas de la API
Usar el archivo test-api.http con la extensión REST Client de VS Code.

## Ramas
- `hito1` - Tareas 1-7
- `hito2` - Tareas 8 y 9 (incluye todo lo de hito1)