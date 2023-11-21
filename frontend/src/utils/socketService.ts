// socketService.js
import { io } from 'socket.io-client';

let socket:any;

export const connectSocket = () => {
  socket = io('http://localhost:4000');
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};

export const getSocket = () => socket;
