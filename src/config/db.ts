import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

if (!DB_NAME || !DB_USER) {
    throw new Error("Faltan variables de base de datos en el archivo .env (DB_NAME, DB_USER, ...)");
}

const db = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST || "localhost",
    port: Number(DB_PORT) || 5432,
    dialect: "postgres",
    logging: false,
});

export default db;
