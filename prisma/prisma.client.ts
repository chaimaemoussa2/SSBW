import "dotenv/config";
import { Pool } from "pg";
import { PrismaClient } from "../generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";

const pool = new Pool({
  host: "127.0.0.1",
  port: 55432,
  user: "yo",
  password: "una_clave_muy_segura_123",
  database: "ssbw",
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export default prisma;