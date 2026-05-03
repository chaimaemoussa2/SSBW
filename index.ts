import express from "express";
import nunjucks from "nunjucks";
import session from "express-session";
import ProductosRouter from "./routes/productos.ts";
import logger from "./logger.ts";
import UsuariosRouter from "./routes/usuarios.ts";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import ApiProductosRouter from "./routes/api.productos.ts";
import cors from "cors";

const app = express();
const PORT = 3000;
app.use(cors({ origin: "http://localhost:5173" }));

nunjucks.configure("views", {
  autoescape: true,
  express: app,
  noCache: true,
});

app.set("view engine", "njk");

app.use(cookieParser());
app.use((req, res, next) => {
  const token = req.cookies?.access_token;

  if (token) {
    try {
      const data = jwt.verify(
        token,
        process.env.SECRET_KEY as string
      ) as {
        usuario: string;
        admin: boolean;
        email: string;
      };

      (req as any).usuario = data.usuario;
      (req as any).admin = data.admin;

      res.locals.usuario = data.usuario;
      res.locals.admin = data.admin;

      logger.info('Autentificado ${data.usuario} admin:${data.admin}');
    } catch {
      res.locals.usuario = undefined;
      res.locals.admin = undefined;
    }
  } else {
    res.locals.usuario = undefined;
    res.locals.admin = undefined;
  }

  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: "my-secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use((req, res, next) => {
  const carrito = (req.session as any).carrito ?? [];
  const total_carrito = carrito.reduce(
    (acc: number, item: any) => acc + item.cantidad,
    0
  );

  res.locals.total_carrito = total_carrito;
  next();
});

app.use("/public/imagenes", express.static("imagenes"));
app.use("/", ProductosRouter);

app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});
app.use("/", UsuariosRouter);
app.use("/", ApiProductosRouter);
