import "dotenv/config";
import db from "./config/db";
import Guitar from "./models/Guitar.model";
import { guitars } from "./data/guitars";

// Carga el catálogo inicial solo si la tabla está vacía
async function seed() {
    try {
        await db.sync();
        const total = await Guitar.count();
        if (total > 0) {
            console.log(`La tabla ya tiene ${total} guitarras, no se inserta nada.`);
        } else {
            await Guitar.bulkCreate(guitars);
            console.log(`Se insertaron ${guitars.length} guitarras.`);
        }
    } catch (error) {
        console.error("Error al ejecutar el seed:", error);
        process.exitCode = 1;
    } finally {
        await db.close();
    }
}

seed();
