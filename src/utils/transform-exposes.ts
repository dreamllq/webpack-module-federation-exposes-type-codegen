import { Exposes, ObjectExposes } from '@/services/type';
import { cloneDeep, isPlainObject } from 'lodash';

export const transformExposes:(exposes:Exposes)=>ObjectExposes = (exposes) => {
  if (isPlainObject(exposes)) {
    return cloneDeep(exposes);
  } else if (Array.isArray(exposes)) {
    return exposes.reduce((acc, item) => {
      acc[item] = item;
      return acc;
    }, {});
  } else {
    return {};
  }
};