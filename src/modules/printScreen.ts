import Jimp from 'jimp/es';
import { mouse, Region, screen, FileType } from '@nut-tree/nut-js';
import { Duplex } from 'stream';

export async function makePrintScreen(duplex: Duplex) {
  const { x, y } = await mouse.getPosition();

  const imageRegion = new Region(x - 100, y - 100, 200, 200);
  const pathImage = await generateCaptureRegion(imageRegion);
  const imageBase64 = await convertImageToBase64(pathImage);
  duplex.write(`prnt_scrn ${imageBase64.split(',')[1]}`);
  console.log('make prt', imageBase64);
}

async function generateCaptureRegion(imageRegion: Region): Promise<string> {
  const fileFormat = FileType.PNG;

  return screen.captureRegion('screen', imageRegion, fileFormat);
}

async function convertImageToBase64(path: string) {
  const image = await Jimp.read(path);
  return image.getBase64Async(Jimp.MIME_PNG);
}
