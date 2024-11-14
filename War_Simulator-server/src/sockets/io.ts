import { Socket } from "socket.io";
import { io } from "../server";


export const handleSocketConnection = (client: Socket) => {
    console.log(`[socket.io] New Connection ${client.id}`)
    client.on("disconnect", () => {
        console.log("Bye bye user");
    })
    client.on("newVote",(candidateId)=>{
        io.emit("updateVotes", {candidateId});
    })
}