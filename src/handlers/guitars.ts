import type { Request, Response } from "express";
import Guitar from "../models/Guitar.model";

// GET /api/guitars todas las guitarras
export async function getGuitars(_req: Request, res: Response) {
    try {
        const guitars = await Guitar.findAll({ order: [["id", "ASC"]] });
        res.json(guitars);
    } catch (error) {
        console.error(error);
        res.status(500).json({ errors: ["Error al consultar las guitarras"] });
    }
}

// POST /api/guitars
export async function createGuitar(req: Request, res: Response) {
    try {
        const { name, image, description, price } = req.body;
        const guitar = await Guitar.create({
            name: name.trim(),
            image: image.trim(),
            description: description.trim(),
            price,
        });
        res.status(201).json(guitar);
    } catch (error) {
        console.error(error);
        res.status(500).json({ errors: ["Error al guardar la guitarra"] });
    }
}
