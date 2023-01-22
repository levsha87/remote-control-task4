import { mouse, left, right, up, down } from '@nut-tree/nut-js';
import { Duplex } from 'stream';

enum Direction {
  LEFT = 'mouse_left',
  RIGHT = 'mouse_right',
  UP = 'mouse_up',
  DOWN = 'mouse_down',
  CURRENT_POSITION = 'mouse_position',
}

export async function moveMouse(direction: string, way: number, duplex: Duplex): Promise<void> {
  switch (direction) {
    case Direction.LEFT:
      await mouse.move(left(way));
      sendAnswer(`${direction} ${way}`);
      break;
    case Direction.RIGHT:
      await mouse.move(right(way));
      sendAnswer(`${direction} ${way}`);
      break;
    case Direction.UP:
      await mouse.move(up(way));
      sendAnswer(`${direction} ${way}`);
      break;
    case Direction.DOWN:
      await mouse.move(down(way));
      sendAnswer(`${direction} ${way}`);
      break;
    case Direction.CURRENT_POSITION:
      const { x, y } = await mouse.getPosition();
      console.log(`${Direction.CURRENT_POSITION} ${x}px, ${y}px`);
      sendAnswer(`${Direction.CURRENT_POSITION} ${x},${y}`);
      break;
  }

  function sendAnswer(msg: string) {
    duplex.write(msg);
  }
}
