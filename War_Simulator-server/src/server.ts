import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db";
import userRouter from "./routes/userRouter"
import organizationRouter from "./routes/organizationRouter"
import attackRouter from "./routes/attackRouter"
import http from 'http'
import { Server } from 'socket.io'
import { handleSocketConnection } from './sockets/io'
import { initializeDataDirect } from "./utils/initializeDataDirect";

dotenv.config();



const PORT = process.env.PORT || 3000;
const app = express();

const httpServer:http.Server = http.createServer(app)
export const io = new Server(httpServer,{
    cors:{
        origin: '*',
        methods:'*'
    }
})

io.on('connection', handleSocketConnection)

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/users", userRouter);
app.use("/api/organizations", organizationRouter);
app.use("/api/attacks", attackRouter);

httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;