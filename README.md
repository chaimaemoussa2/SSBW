# Cómo ejecutar la web

## Requisitos
- Node.js
- Docker Desktop

## Opción 1
1. Abrir Docker Desktop
2. Ejecutar docker compose up -d
3. Ejecutar npm install
4. Ejecutar npx prisma generate
5. Restaurar la base de datos ejecutando:
   docker exec -i ssbw_postgres psql -U yo -d ssbw < backup_ssbw.sql
6. Ejecutar npm run dev

## Opción 2
Si se prefiere recrear la base de datos desde cero:
1. Ejecutar docker compose up -d
2. Ejecutar npm install
3. Ejecutar npx prisma generate
4. Ejecutar npx prisma migrate dev
5. Ejecutar node seed.ts
6. Ejecutar node registra_usuarios.ts
7. Ejecutar npm run dev

## Abrir la web
http://localhost:3000

## Usuarios de prueba
- admin@ssbw.com / 1234
- user@ssbw.com / 1234

## Pruebas de la API
Usar el archivo test-api.http con la extensión REST Client de VS Code.