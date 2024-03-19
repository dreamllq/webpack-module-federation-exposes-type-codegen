import { resolveDTSFilePath } from '@/utils/resolve-dts-file-path';

describe('resolveDTSFilePath', () => {
  test('.vue', () => {
    expect(resolveDTSFilePath('/a/b.vue')).toEqual('/a/b.vue.d.ts');
  });

  test('.js', () => {
    expect(resolveDTSFilePath('/a/b.js')).toEqual('/a/b.d.ts');
  });

  test('.x', () => {
    expect(resolveDTSFilePath('/a/b.x')).toEqual(null);
  });
});