import path from 'path';
import { bundle } from '@remotion/bundler';

bundle(
  require.resolve(path.join(__dirname, 'src', 'remotion', 'index')),
  undefined,
  {
    outDir: path.join(__dirname, '.remotion'),
  }
);
