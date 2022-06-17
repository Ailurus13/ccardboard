import fs from 'fs';
import path from 'path';

export class AppFileStorage {
  workdir: string;

  constructor(workdir: string) {
    this.workdir = workdir;
    fs.mkdirSync(workdir, { recursive: true });
  }

  store(buffer: Buffer) {
    const id = this._getFileId();
    const filePath = path.join(this.workdir, id);
    fs.writeFileSync(filePath, buffer);
    return id;
  }

  _getFileId(): string {
    return (Math.random() + 1).toString(36).substring(7);
  }
}
