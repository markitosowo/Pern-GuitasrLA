import cors from "cors";
import express from "express";
import router from "./router";

const server = express();

// CORS: solo permite peticiones desde la app de React
server.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        methods: ["GET", "POST"],
    })
);

server.use(express.json());

server.use("/api/guitars", router);

export default server;
