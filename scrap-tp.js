import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

function nombreArchivoDesde(titulo) {
  return titulo.replace(/[^a-z0-9]/gi, "_").toLowerCase();
}

async function descargarImagen(url, rutaDestino) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Could not download image: ${url}');
  }

  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  await fs.writeFile(rutaDestino, buffer);
}

const browser = await chromium.launch({ headless: true });

const context = await browser.newContext({
  userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36"
});

const page = await context.newPage();

try {
  await page.goto(
    "https://tiendaprado.com/es/385-impresiones?resultsPerPage=999",
    { timeout: 15000 }
  );

  await page.waitForTimeout(3000);

  const locatorsPaginas = page.locator(".thumbnail-container > a");
  const listaPaginas = [];
  const todosLosLinks = await locatorsPaginas.all();

  for (const loc of todosLosLinks) {
    const pagina = await loc.getAttribute("href");
    if (pagina) {
      listaPaginas.push(pagina);
    }
  }

  console.log("Found " + listaPaginas.length + " product links");

  const productos = [];

  for (const pagina of listaPaginas) {
    try {
      console.log("Scraping:", pagina);

      await page.goto(pagina, { timeout: 15000 });
      await page.waitForTimeout(1500);

      const titulo = await page.locator("h1").innerText();
      const texto_precio = await page.locator(".current-price-value").first().innerText();
      const bloqueInfo = await page.locator(".product-information").innerText();

      const descripcion = bloqueInfo
        .replace(titulo, "")
        .replace(texto_precio, "")
        .replace("Añadir a la cesta", "")
        .trim();

      const imagenUrl = await page.locator(".product-cover img").first().getAttribute("src");
      const nombre_imagen = nombreArchivoDesde(titulo) + ".jpg";

      productos.push({
        titulo: titulo,
        descripcion: descripcion,
        texto_precio: texto_precio,
        imagen: nombre_imagen
      });

      if (imagenUrl) {
        const rutaImagen = path.join("imagenes", nombre_imagen);
        await descargarImagen(imagenUrl, rutaImagen);
      }
    } catch (error) {
      console.error("Error scraping product:", pagina);
      console.error(error);
    }
  }

  await fs.writeFile(
    "productos.json",
    JSON.stringify(productos, null, 2),
    "utf-8"
  );

  console.log("Saved " + productos.length + " products");
} catch (error) {
  console.error("Error:", error);
} finally {
  await browser.close();
}