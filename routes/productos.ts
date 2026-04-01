import express, { type Request, type Response } from "express";
import prisma from "../prisma/prisma.client.ts";
import logger from "../logger.ts";

const router = express.Router();

router.get("/", async (_req: Request, res: Response): Promise<void> => {
  try {
    const cards = await prisma.producto.findMany();
    res.render("portada.njk", { cards });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    logger.error(message);
    res.status(500).send(`Error: ${message}`);
  }
});

router.get("/producto/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      res.status(400).send("Invalid product id");
      return;
    }

    const producto = await prisma.producto.findUnique({
      where: { id },
    });

    if (!producto) {
      res.status(404).send("Producto not found");
      return;
    }

    res.render("detalle.njk", { producto });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    logger.error(message);
    res.status(500).send(`Error: ${message}`);
  }
});

router.get("/buscar", async (req: Request, res: Response): Promise<void> => {
  try {
    const busqueda = String(req.query.busqueda ?? "").trim();

    const cards = await prisma.producto.findMany({
      where: {
        OR: [
          { titulo: { contains: busqueda, mode: "insensitive" } },
          { descripcion: { contains: busqueda, mode: "insensitive" } },
        ],
      },
    });

    res.render("portada.njk", { cards });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    logger.error(message);
    res.status(500).send(`Error: ${message}`);
  }
});

router.post("/al-carrito/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const cantidad = Number(req.body.cantidad);

    logger.debug(`Al carrito de ${id} ${cantidad} unidad(es)`);

    const producto = await prisma.producto.findUnique({
      where: { id },
    });

    if (!producto) {
      res.status(404).send("Producto not found");
      return;
    }

    const sessionAny = req.session as any;

    if (!sessionAny.carrito) {
      sessionAny.carrito = [];
    }

    if (cantidad > 0) {
      sessionAny.carrito.push({ id, cantidad });
    }

    const total_carrito = sessionAny.carrito.reduce(
      (acc: number, item: any) => acc + Number(item.cantidad),
      0
    );

    sessionAny.total_carrito = total_carrito;
    res.locals.total_carrito = total_carrito;

    logger.debug(`Total carrito: ${total_carrito}`);

    res.render("detalle.njk", { producto });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    logger.error(message);
    res.status(500).send(`Error: ${message}`);
  }
});

export default router;