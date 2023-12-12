import { io } from 'socket.io-client';
export default function () {
  const config = useRuntimeConfig();
  console.log()
  const socket = io(config.public.baseURL, {
    autoConnect: true
  })
  return socket
} 