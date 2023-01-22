import { mouse, left, right, up, down, Button, straightTo, Point } from '@nut-tree/nut-js';
import { GeometricFigures } from '../model/models';

export async function drawFigure(data: string): Promise<void> {
  await mouse.pressButton(Button.LEFT);

  switch (data.split(' ')[0]) {
    case GeometricFigures.SQUARE:
      await drawSquare(data);
      break;

    case GeometricFigures.RECTANGLE:
      await drawRectangle(data);
      break;

    case GeometricFigures.CIRCLE:
      await drawCircle(data);
      break;
  }

  await mouse.releaseButton(Button.LEFT);
}

async function drawSquare(data: string) {
  const width = +data.split(' ')[1];
  await mouse.move(right(width));
  await mouse.move(down(width));
  await mouse.move(left(width));
  await mouse.move(up(width));
}

async function drawRectangle(data: string) {
  const width = +data.split(' ')[1];
  const height = +data.split(' ')[2];

  await mouse.move(right(width));
  await mouse.move(down(height));
  await mouse.move(left(width));
  await mouse.move(up(height));
}

async function drawCircle(data: string) {
  const radius = +data.split(' ')[1];
  let { x, y } = await mouse.getPosition();
  const centrX = x + radius;
  const centrY = y;

  for (let i = -180; i <= 180; i++) {
    const angleRad = (i * Math.PI) / 180;
    x = centrX + Math.cos(angleRad) * radius;
    y = centrY + Math.sin(angleRad) * radius;

    await mouse.move(straightTo(new Point(x, y)));
  }
}
