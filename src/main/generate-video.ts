import path from 'path';
import { getCompositions, renderMedia } from '@remotion/renderer';

export async function generateVideo(output: string) {
  const compositionId = 'my-comp';
  const bundleLocation = path.join(__dirname, 'remotion');
  const comps = await getCompositions(bundleLocation);
  const composition = comps.find((c) => c.id === compositionId);
  if (!composition) {
    throw new Error(`No composition with the ID ${compositionId} found`);
  }

  await renderMedia({
    composition,
    serveUrl: bundleLocation,
    codec: 'h264',
    outputLocation: output,
    onProgress: ({ renderedFrames }) => {
      console.log(renderedFrames);
    },
  });
}
