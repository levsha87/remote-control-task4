import { WebSocketServer, createWebSocketStream } from 'ws';
import dotenv from 'dotenv';
dotenv.config();

import { moveMouse } from './modules/navigation';

const BACK_END_PORT = Number(process.env.BACK_END_PORT ?? 8080);

function initApp() {
  console.log('start');

  const server = new WebSocketServer({ port: BACK_END_PORT });

  server.on('connection', (ws) => {
    const duplex = createWebSocketStream(ws, { encoding: 'utf8', decodeStrings: false });
    duplex.on('data', (chunk: string) => {
      console.log(`Recieved ${chunk}`);
      moveMouse(chunk.split(' ')[0], +chunk.split(' ')[1], duplex);
    });
    ws.on('close', () => duplex.destroy());
  });

  server.on('error', (e) => console.log(e));
  server.on('listening', () => {
    console.log(`WebSocket server listening on port ${BACK_END_PORT}`);
  });
}

initApp();
