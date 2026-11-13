import { DataTypes } from "sequelize";
import db from "../config/db";

// Tabla guitars
const Guitar = db.define(
    "Guitar",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(120),
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: { min: 0 },
            // PostgreSQL devuelve DECIMAL como string; lo convertimos a número para React
            get() {
                return Number(this.getDataValue("price"));
            },
        },
    },
    {
        tableName: "guitars",
        timestamps: false,
    }
);

export default Guitar;
