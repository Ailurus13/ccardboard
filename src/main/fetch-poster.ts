import fs from 'fs';
import axios from 'axios';
import { StorePosterDto } from '@common/dto/StorePoster.dto';

export async function fetchPoster(poster: StorePosterDto): Promise<Buffer> {
  if (poster.type === 'url') {
    const response = await axios.get(poster.value, {
      responseType: 'arraybuffer',
    });
    return response.data;
  }

  if (poster.type === 'path') {
    return fs.readFileSync(poster.value);
  }

  throw new Error(`Poster type ${poster.type} does not exists`);
}
