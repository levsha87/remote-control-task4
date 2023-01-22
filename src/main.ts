import { WebSocketServer /*createWebSocketStream*/ } from 'ws';
import dotenv from 'dotenv';
dotenv.config();

const BACK_END_PORT = Number(process.env.BACK_END_PORT ?? 8080);

function initApp() {
  console.log('start');

  const server = new WebSocketServer({ port: BACK_END_PORT });

  server.on('headers', ([headers]) => console.log(headers));
  server.on('connection', () => console.log('connect'));
  server.on('close', () => console.log('close'));
  server.on('error', (e) => console.log(e));
  server.on('listening', () => {
    console.log(`WebSocket server listening on port ${BACK_END_PORT}`);
  });
}

initApp();
