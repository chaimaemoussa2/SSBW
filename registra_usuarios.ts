import "dotenv/config";
import bcrypt from "bcryptjs";
import prisma from "./prisma/prisma.client.ts";

async function creaUsuario(
  email: string,
  nombre: string,
  password: string,
  admin = false
) {
  const hash = await bcrypt.hash(password, 10);

  const usuario = await prisma.usuario.upsert({
    where: { email },
    update: {
      nombre,
      contrasena: hash,
      admin,
    },
    create: {
      email,
      nombre,
      contrasena: hash,
      admin,
    },
  });

  console.log('Usuario guardado: ${usuario.email} admin:${usuario.admin}');
}

async function main() {
  await creaUsuario("admin@ssbw.com", "Admin", "1234", true);
  await creaUsuario("user@ssbw.com", "User", "1234", false);
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });