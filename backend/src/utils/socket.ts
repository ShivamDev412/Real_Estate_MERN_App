import { Server as SocketIOServer } from "socket.io";
let io: SocketIOServer;

export const initializeSocketIo = (httpServer: any) => {
  const options = {
    cors: {
      origin: process.env.FRONTEND_URL!,
      methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
    },
  };

  io = new SocketIOServer(httpServer, options);
};

export const getIo = () => io;
