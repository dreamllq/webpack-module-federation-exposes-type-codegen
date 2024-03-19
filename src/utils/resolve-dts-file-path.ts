import path from 'path';
import { vueTscSupportExtensions, tscSupportExtensions } from '@/configs/extensions';

export const resolveDTSFilePath = (_file:string) => {
  const { base, name, ext } = path.parse(_file);
  if (vueTscSupportExtensions.includes(ext)) {
    return path.join(_file, '..', `${base}.d.ts`);
  } else if (tscSupportExtensions.includes(ext)) {
    return path.join(_file, '..', `${name}.d.ts`);
  } else {
    return null;
  }
};