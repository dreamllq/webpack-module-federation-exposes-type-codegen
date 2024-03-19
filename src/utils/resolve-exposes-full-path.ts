import { ObjectExposes } from '@/services/type';
import { resolveFullFilePath } from '@/utils/resolve-full-file-path';

export const resolveExposesFullPath: (exposes: ObjectExposes, options?:{cwd?:string})=>ObjectExposes = (exposes, options) => Object.keys(exposes).reduce((acc, key) => {
  const _fp = resolveFullFilePath(exposes[key], options);
  if (_fp) {
    acc[key] = _fp;
  }
  return acc;
}, {});

