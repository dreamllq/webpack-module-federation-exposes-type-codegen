import path from 'path';
import fs from 'fs';
import { defaultExts, defaultFileNames } from '@/configs/extensions';

export const resolveFullFilePath = (file:string, options?:{cwd?:string}) => {
  let _file = file;
  if (options?.cwd) {
    _file = path.join(options.cwd, file);
  }
  const extname = path.extname(_file);
  if (extname === '') {
    const maybeAvailableFiles:string[] = [];
    defaultExts.forEach(ext => {
      maybeAvailableFiles.push(`${_file}${ext}`);
    });
    defaultFileNames.forEach(fn => {
      defaultExts.forEach(ext => {
        maybeAvailableFiles.push(`${_file}${path.sep}${fn}${ext}`);
      });
    });

    return maybeAvailableFiles.find(maf => fs.existsSync(maf)) || null;
  }
  return fs.existsSync(_file) ? _file : null;
};