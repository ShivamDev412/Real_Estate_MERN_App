// socketService.js
import { io } from "socket.io-client";

const socket = io("http://localhost:4000", {
    autoConnect: false,
}); // Replace with your backend server URL

export default socket;