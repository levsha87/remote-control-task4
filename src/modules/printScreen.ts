import Jimp from 'jimp/es';
import { mouse, Region, screen } from '@nut-tree/nut-js';
import { Duplex } from 'stream';

export async function makePrintScreen(duplex: Duplex) {
  const { x, y } = await mouse.getPosition();

  const imageRegion = new Region(x - 100, y - 100, 200, 200);
  const image = await screen.grabRegion(imageRegion);
  const imageRGB = await image.toRGB();
  const createImage = new Jimp(imageRGB);
  const imageBase64 = await createImage.getBase64Async(Jimp.MIME_PNG);

  duplex.write(`prnt_scrn ${imageBase64.split(',')[1]}`);
  console.log('make prt', imageBase64);
}
