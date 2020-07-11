import io from "socket.io-client";
const socket = io("http://localhost:4040");

export const useSocket = () => socket;
