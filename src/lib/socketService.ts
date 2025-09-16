import { io, Socket } from "socket.io-client";

export let socket: Socket | null = null;
export let videoSocket: Socket | null = null;

export const connectSocket = (userId: string, baseUrl: string) => {
  if (!socket) {
    socket = io(baseUrl, { query: { userId }, path: '/chat', autoConnect: true });
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket?.connected) {
    socket.disconnect();
    socket = null;
  }
};

export const createVideoSocket = (userId: string, baseUrl: string) => {
  if (!videoSocket) {
    videoSocket = io(baseUrl, { query: { userId }, path: "/video", autoConnect: true });
  }
  return videoSocket;
};

export const destroyVideoSocket = () => {
  if (videoSocket?.connected) {
    videoSocket.disconnect();
    videoSocket = null;
  }
};