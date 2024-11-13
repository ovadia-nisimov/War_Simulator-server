import express, { Express } from "express";
import dotenv from "dotenv";
import usersRoutes from "./routes/usersRoutes";
// import adminRoutes from "./routes/adminRoutes";
import missilesRoutes from "./routes/missilesRoutes";
import organizationsRoutes from "./routes/organizationsRoutes";
import { connectDB } from "./config/db";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
// import { handleSocketConnection } from "./sockets/io";


dotenv.config();

const app: Express = express();


const httpServer = http.createServer(app);
// export const io = new Server(httpServer, {
//   cors: {
//     origin: "*",
//     methods: "*"
//   },
// });
// io.on("connection", handleSocketConnection);


app.use(cors());
const PORT = process.env.PORT || 4000;


app.use(express.json());


connectDB();


app.use("/api/users", usersRoutes);
app.use("/api/organizations", organizationsRoutes);
app.use("/api/missiles", missilesRoutes);



httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
