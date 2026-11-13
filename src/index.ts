import "dotenv/config";
import db from "./config/db";
import server from "./server";

async function startServer() {
    const port = Number(process.env.PORT) || 4000;

    try {
        await db.authenticate();
        await db.sync(); // crea la tabla "guitars" si no existe
        server.listen(port, () => {
            console.log(`API escuchando en http://localhost:${port}`);
        });
    } catch (error) {
        console.error("No se pudo iniciar la API o conectar con PostgreSQL:", error);
        process.exitCode = 1;
    }
}

startServer();
