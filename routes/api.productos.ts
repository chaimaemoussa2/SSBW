import express, { type Request, type Response } from "express";
import prisma from "../prisma/prisma.client.ts";

const router = express.Router();

router.get("/api/productos", async (req: Request, res: Response) => {
  try {
    const desde = Number(req.query.desde ?? 1);
    const hasta = Number(req.query.hasta ?? 20);
    const ordenacion = String(req.query.ordenacion ?? "ascendente");

    const skip = Math.max(desde - 1, 0);
    const take = Math.max(hasta - desde + 1, 1);

    const productos = await prisma.producto.findMany({
      skip,
      take,
      orderBy: {
        id: ordenacion === "descendente" ? "desc" : "asc",
      },
    });

    res.json(productos);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: message });
  }
});

router.get("/api/productos/random", async (_req: Request, res: Response) => {
  try {
    const count = await prisma.producto.count();
    const skip = Math.floor(Math.random() * count);
    const producto = await prisma.producto.findFirst({
      skip,
    });
    res.json(producto);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: message });
  }
});

router.get("/api/productos/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      res.status(400).json({ error: "Invalid product id" });
      return;
    }

    const producto = await prisma.producto.findUnique({
      where: { id },
    });

    if (!producto) {
      res.status(404).json({ error: "Producto not found" });
      return;
    }

    res.json(producto);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: message });
  }
});

router.post("/api/productos", async (req: Request, res: Response) => {
  try {
    const { titulo, descripcion, precio, imagen } = req.body;

    const producto = await prisma.producto.create({
      data: {
        titulo,
        descripcion,
        precio: Number(precio),
        imagen,
      },
    });

    res.status(201).json(producto);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: message });
  }
});

router.put("/api/productos/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { titulo, descripcion, precio } = req.body;

    if (Number.isNaN(id)) {
      res.status(400).json({ error: "Invalid product id" });
      return;
    }

    const producto = await prisma.producto.update({
      where: { id },
      data: {
        titulo,
        descripcion,
        precio: Number(precio),
      },
    });

    res.json(producto);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: message });
  }
});

router.delete("/api/productos/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      res.status(400).json({ error: "Invalid product id" });
      return;
    }

    const producto = await prisma.producto.delete({
      where: { id },
    });

    res.json(producto);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: message });
  }
});

router.get("/api/carrito", (req: Request, res: Response) => {
  const sessionAny = (req as any).session;
  const carrito = sessionAny.carrito ?? [];
  res.json(carrito);
});

router.delete("/api/carrito/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const sessionAny = (req as any).session;

    if (!sessionAny.carrito) {
      res.json({ ok: true });
      return;
    }

    const index = sessionAny.carrito.findIndex((item: any) => item.id === id);
    if (index !== -1) {
      sessionAny.carrito.splice(index, 1);
    }

    sessionAny.total_carrito = sessionAny.carrito.reduce(
      (acc: number, item: any) => acc + Number(item.cantidad),
      0
    );

    res.json({ ok: true, total: sessionAny.total_carrito });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: message });
  }
});

export default router;