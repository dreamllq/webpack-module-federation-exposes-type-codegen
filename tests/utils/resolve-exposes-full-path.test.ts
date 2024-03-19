import path from 'path';

describe('resolveExposesFullPath', () => {
  afterEach(() => {
    jest.resetModules();
  });
  test('case1', async () => {
    jest.mock('fs', () => {
      const fs:any = jest.createMockFromModule('fs');
      fs.existsSync = (f:string) => f === './b.vue';
      return fs;
    });
    const { resolveExposesFullPath } = await import('@/utils/resolve-exposes-full-path');
    expect(resolveExposesFullPath({ './a': './b' })).toEqual({ './a': './b.vue' });
  });
  test('case2, 有文件不存在', async () => {
    jest.mock('fs', () => {
      const fs:any = jest.createMockFromModule('fs');
      fs.existsSync = (f:string) => [
        '/tests/exposes/components/a.vue',
        '/tests/exposes/components/b/index.js',
        '/tests/exposes/components/index.vue',
        '/tests/exposes/components/index.js',
        '/tests/exposes/constants/a.ts',
        '/tests/exposes/constants/b.ts'
      ].includes(f);
      return fs;
    });
    const { resolveExposesFullPath } = await import('@/utils/resolve-exposes-full-path');
    expect(resolveExposesFullPath({
      './components/a': '/tests/exposes/components/a',
      './components/b': '/tests/exposes/components/b',
      './components/c': '/tests/exposes/components/index.vue',
      './components/d': '/tests/exposes/components/index.js',
      './components/e': '/tests/exposes/components/b/out.js',
      './constants/a': '/tests/exposes/constants/a.ts',
      './constants/b': '/tests/exposes/constants/b'
    })).toEqual({
      './components/a': '/tests/exposes/components/a.vue',
      './components/b': '/tests/exposes/components/b/index.js',
      './components/c': '/tests/exposes/components/index.vue',
      './components/d': '/tests/exposes/components/index.js',
      './constants/a': '/tests/exposes/constants/a.ts',
      './constants/b': '/tests/exposes/constants/b.ts'
    });
  });
  test('case3', async () => {
    jest.mock('fs', () => {
      const fs:any = jest.createMockFromModule('fs');
      fs.existsSync = (f:string) => ['./tests/exposes/components/b/index.js'].includes(f);
      return fs;
    });
    const { resolveExposesFullPath } = await import('@/utils/resolve-exposes-full-path');
    expect(resolveExposesFullPath({ './components/b': './tests/exposes/components/b' })).toEqual({ './components/b': './tests/exposes/components/b/index.js' });
  });
  test('case4', async () => {
    jest.mock('fs', () => {
      const fs:any = jest.createMockFromModule('fs');
      fs.existsSync = (f:string) => [
        './tests/exposes/components/a.vue',
        './tests/exposes/components/b/index.js',
        './tests/exposes/components/index.vue',
        './tests/exposes/components/index.js',
        './tests/exposes/components/b/out.js',
        './tests/exposes/constants/a.ts',
        './tests/exposes/constants/b.ts'
      ].includes(f);
      return fs;
    });
    const { resolveExposesFullPath } = await import('@/utils/resolve-exposes-full-path');
    expect(resolveExposesFullPath({
      './components/a': './tests/exposes/components/a',
      './components/b': './tests/exposes/components/b',
      './components/c': './tests/exposes/components/index.vue',
      './components/d': './tests/exposes/components/index.js',
      './components/e': './tests/exposes/components/b/out.js',
      './constants/a': './tests/exposes/constants/a.ts',
      './constants/b': './tests/exposes/constants/b'
    })).toEqual({
      './components/a': './tests/exposes/components/a.vue',
      './components/b': './tests/exposes/components/b/index.js',
      './components/c': './tests/exposes/components/index.vue',
      './components/d': './tests/exposes/components/index.js',
      './components/e': './tests/exposes/components/b/out.js',
      './constants/a': './tests/exposes/constants/a.ts',
      './constants/b': './tests/exposes/constants/b.ts'
    });
  });
  test('case5+cwd', async () => {
    jest.mock('fs', () => {
      const fs:any = jest.createMockFromModule('fs');
      fs.existsSync = (f:string) => [
        './tests/exposes/components/a.vue',
        './tests/exposes/components/b/index.js',
        './tests/exposes/components/index.vue',
        './tests/exposes/components/index.js',
        './tests/exposes/constants/a.ts',
        './tests/exposes/constants/b.ts'
      ].map(item => path.join(process.cwd(), item)).includes(f);
      return fs;
    });
    const { resolveExposesFullPath } = await import('@/utils/resolve-exposes-full-path');
    expect(resolveExposesFullPath({
      './components/a': './tests/exposes/components/a',
      './components/b': './tests/exposes/components/b',
      './components/c': './tests/exposes/components/index.vue',
      './components/d': './tests/exposes/components/index.js',
      './components/e': './tests/exposes/components/b/out.js',
      './constants/a': './tests/exposes/constants/a.ts',
      './constants/b': './tests/exposes/constants/b'
    }, { cwd: process.cwd() })).toEqual({
      './components/a': path.join(process.cwd(), './tests/exposes/components/a.vue'),
      './components/b': path.join(process.cwd(), './tests/exposes/components/b/index.js'),
      './components/c': path.join(process.cwd(), './tests/exposes/components/index.vue'),
      './components/d': path.join(process.cwd(), './tests/exposes/components/index.js'),
      './constants/a': path.join(process.cwd(), './tests/exposes/constants/a.ts'),
      './constants/b': path.join(process.cwd(), './tests/exposes/constants/b.ts')
    });
  });
});