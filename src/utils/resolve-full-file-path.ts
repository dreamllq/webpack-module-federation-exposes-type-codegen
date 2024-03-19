import path from 'path';
import fs from 'fs';
import { defaultExts, defaultFileNames } from '@/configs/extensions';

export const resolveFullFilePath = (_file:string) => {
  const extname = path.extname(_file);
  if (extname === '') {
    const maybeAvailableFiles:string[] = [];
    defaultExts.forEach(ext => {
      maybeAvailableFiles.push(`${_file}${ext}`);
    });
    defaultFileNames.forEach(fn => {
      defaultExts.forEach(ext => {
        maybeAvailableFiles.push(`${path.join(_file, fn)}${ext}`);
      });
    });

    return maybeAvailableFiles.find(maf => fs.existsSync(maf)) || _file;
  }
  return _file;
};