# Cómo ejecutar la web

## Requisitos
- Node.js
- Docker Desktop

## Pasos
1. Crear un archivo .env a partir de .env.example
2. Ejecutar docker compose up -d
3. Ejecutar npm install
4. Ejecutar npx prisma generate
5. Ejecutar npx prisma migrate dev
6. Ejecutar node seed.ts
7. Ejecutar node registra_usuarios.ts
8. Ejecutar npm run dev

## Abrir la web
http://localhost:3000

## Usuarios de prueba
- admin@ssbw.com / 1234
- user@ssbw.com / 1234

## Pruebas de la API
Usar el archivo test-api.http con la extensión REST Client de VS Code.