import { WebSocketServer, createWebSocketStream } from 'ws';
import dotenv from 'dotenv';
dotenv.config();

import { moveMouse } from './modules/navigation';
import { Modules } from './model/models';
import { drawFigure } from './modules/draw';
import { makePrintScreen } from './modules/printScreen';

const BACK_END_PORT = Number(process.env.BACK_END_PORT ?? 8080);

function initApp() {
  const server = new WebSocketServer({ port: BACK_END_PORT });

  server.on('connection', (ws) => {
    console.log(`Connect to server on port ${BACK_END_PORT}`);
    const duplex = createWebSocketStream(ws, { encoding: 'utf8', decodeStrings: false });
    duplex.on('data', (chunk: string) => {
      console.log(`Recieved ${chunk}`);
      const before_ = chunk.substring(0, chunk.indexOf('_'));

      switch (before_) {
        case Modules.NAVIGATION:
          moveMouse(chunk.split(' ')[0], +chunk.split(' ')[1], duplex);
          break;

        case Modules.DRAWING:
          drawFigure(chunk);
          break;

        case Modules.PRINT_SCREEN:
          makePrintScreen(duplex);
          break;
      }
    });
    ws.on('close', () => duplex.destroy());
  });

  server.on('error', (e) => console.log(e.message));
  server.on('listening', () => {
    console.log(`WebSocket server listening on port ${BACK_END_PORT}`);
  });
}

initApp();
