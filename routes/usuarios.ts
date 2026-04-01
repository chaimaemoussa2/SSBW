import express, { type Request, type Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prisma/prisma.client.ts";
import logger from "../logger.ts";

const router = express.Router();

router.get("/login", (_req: Request, res: Response) => {
  res.render("login.njk", { error: false });
});

router.post("/login", async (req: Request, res: Response) => {
  const { email, contrasena } = req.body;

  try {
    const usuario = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!usuario) {
      res.render("login.njk", { error: true });
      return;
    }

    const ok = await bcrypt.compare(contrasena, usuario.contrasena);

    if (!ok) {
      res.render("login.njk", { error: true });
      return;
    }

    const token = jwt.sign(
      { usuario: usuario.nombre, admin: usuario.admin, email: usuario.email },
      process.env.SECRET_KEY as string
    );

    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .redirect("/");
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    logger.error(message);
    res.render("login.njk", { error: true });
  }
});

router.get("/logout", (_req: Request, res: Response) => {
  res.clearCookie("access_token").redirect("/");
});

export default router;