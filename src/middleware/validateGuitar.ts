import type { NextFunction, Request, Response } from "express";

// Valida el body del POST sin campos vacíos y con los tipos correctos
export function validateGuitar(req: Request, res: Response, next: NextFunction) {
    const { name, image, description, price } = req.body ?? {};
    const errors: string[] = [];

    if (typeof name !== "string" || name.trim() === "") {
        errors.push("El nombre es obligatorio");
    }
    if (typeof image !== "string" || image.trim() === "") {
        errors.push("La imagen es obligatoria");
    }
    if (typeof description !== "string" || description.trim() === "") {
        errors.push("La descripción es obligatoria");
    }
    if (typeof price !== "number" || !Number.isFinite(price)) {
        errors.push("El precio debe ser un número");
    } else if (price <= 0) {
        errors.push("El precio debe ser mayor a 0");
    }

    if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
    }

    next();
}
