import { Socket } from "socket.io";
import { io } from "../server";
import { IAttack } from "../models/attackModel";
import jwt from "jsonwebtoken";
import { AttackCreationData } from "../DTO/attackDTO";
import { createAttackService, updateAttackStatusService } from "../services/attackService";


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

        client.on("interceptAttack", async ({ attackId, missileName, interceptorId }) => {
            try {
                const updatedAttack = await updateAttackStatusService(attackId, "Intercepted", missileName, interceptorId);
                io.emit("attackIntercepted", updatedAttack);
                console.log("Attack intercepted:", updatedAttack);
            } catch (error) {
                console.error("Error intercepting attack:", error);
                client.emit("error", { message: "Failed to intercept attack" });
            }
        });

    } catch (error) {
        console.error("Invalid token:", error);
        client.disconnect();
    }
};