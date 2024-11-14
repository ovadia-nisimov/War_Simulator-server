// src/sockets/io.ts

import { Socket } from "socket.io";
import { io } from "../server";
import jwt from "jsonwebtoken";

interface UserPayload {
    id: string;
    username: string;
}

export const handleSocketConnection = (client: Socket) => {
    const token = client.handshake.auth.token as string;

    if (!token) {
        client.disconnect();
        return;
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;

        (client as any).user = payload;

        client.on("attackLaunch", (attackData) => {
            io.emit("attackLaunched", { ...attackData, attackerId: payload.id });
        });

    } catch (error) {
        console.error("Invalid token:", error);
        client.disconnect();
    }
};