import { Server as SocketIOServer } from "socket.io";
let io: SocketIOServer;

export const initializeSocketIo = (httpServer: any) => {
  const options = {
    cors: {
      origin: "http://localhost:5173/", // Adjust this to your frontend's URL
      methods: ["GET", "POST"],
    },
  };

  io = new SocketIOServer(httpServer, options);
};

export const getIo = () => io;
