// src/sockets/io.ts

import { Socket } from "socket.io";
import { io } from "../server";
import { IAttack } from "../models/attackModel";
import jwt from "jsonwebtoken";
import { AttackCreationData } from "../DTO/attackDTO";
import { createAttackService } from "../services/attackService";


export const handleSocketConnection = (client: Socket) => {
    try {
        client.on("attackLaunch", async (attackData) => {
            try {
                const newAttack = await createAttackService(attackData);
                io.emit("attackLaunched", newAttack);
                console.log("Attack launched:", newAttack);
                
            } catch (error) {
                console.error("Error creating attack:", error);
                client.emit("error", { message: "Failed to create attack" });
            }
        });

    } catch (error) {
        console.error("Invalid token:", error);
        client.disconnect();
    }
};