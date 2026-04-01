import prisma from "./prisma/prisma.client.ts";
import productos from "./productos.json" with { type: "json" };

type ProductoJson = {
  titulo: string;
  descripcion: string;
  texto_precio: string;
  imagen: string;
};

type ProductosJson = ProductoJson[];

await guardarEnDB(productos as ProductosJson);

const productosBaratos = await prisma.producto.findMany({
  where: {
    descripcion: {
      startsWith: "Lámina",
    },
  },
  orderBy: {
    precio: "asc",
  },
});

console.log("Consulta de prueba:", productosBaratos);

await prisma.$disconnect();

async function guardarEnDB(productos: ProductosJson): Promise<void> {
  for (const producto of productos) {
    const titulo = producto.titulo;
    const descripcion = producto.descripcion;
    const imagen = producto.imagen;
    const precio = Number(
      producto.texto_precio.slice(0, -2).replace(",", ".").trim()
    );

    try {
      const prod = await prisma.producto.create({
        data: {
          titulo,
          descripcion,
          imagen,
          precio,
        },
      });

      console.log("Creado", prod.id, prod.titulo);
    } catch (error: any) {
      console.error(error.message);
    }
  }
}