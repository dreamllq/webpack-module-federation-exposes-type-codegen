import path from 'path';

describe('resolveFullFilePath', () => {
  afterEach(() => {
    jest.resetModules();
  });
  test('存在.js', async () => {
    jest.mock('fs', () => {
      const fs:any = jest.createMockFromModule('fs');
      fs.existsSync = (f:string) => f === '/a/b/c.js';
      return fs;
    });
    const { resolveFullFilePath } = await import('@/utils/resolve-full-file-path');

    expect(resolveFullFilePath('/a/b/c')).toEqual('/a/b/c.js');
    expect(resolveFullFilePath('/a/b/c.js')).toEqual('/a/b/c.js');
  });
  
  test('存在 index.js', async () => {
    jest.mock('fs', () => {
      const fs:any = jest.createMockFromModule('fs');
      fs.existsSync = (f:string) => f === '/a/b/c/index.js';
      return fs;
    });
    const { resolveFullFilePath } = await import('@/utils/resolve-full-file-path');

    expect(resolveFullFilePath('/a/b/c')).toEqual('/a/b/c/index.js');
  });
  
  test('存在 相对路径', async () => {
    jest.mock('fs', () => {
      const fs:any = jest.createMockFromModule('fs');
      fs.existsSync = (f:string) => f === './a/b/c/index.js';
      return fs;
    });
    const { resolveFullFilePath } = await import('@/utils/resolve-full-file-path');

    expect(resolveFullFilePath('./a/b/c')).toEqual('./a/b/c/index.js');
  });

  test('存在 + cwd', async () => {
    jest.mock('fs', () => {
      const fs:any = jest.createMockFromModule('fs');
      fs.existsSync = (f:string) => f === path.join(process.cwd(), './a/b/c/index.js');
      return fs;
    });
    const { resolveFullFilePath } = await import('@/utils/resolve-full-file-path');

    expect(resolveFullFilePath('./a/b/c', { cwd: process.cwd() })).toEqual(path.join(process.cwd(), './a/b/c/index.js'));
  });

  test('不存在', async () => {
    jest.mock('fs', () => {
      const fs:any = jest.createMockFromModule('fs');
      fs.existsSync = (f:string) => f === '/a/b/d.js';
      return fs;
    });

    const { resolveFullFilePath } = await import('@/utils/resolve-full-file-path');
    expect(resolveFullFilePath('/a/b/d')).toEqual('/a/b/d.js');
    expect(resolveFullFilePath('/a/b/d.js')).toEqual('/a/b/d.js');
    expect(resolveFullFilePath('/a/b/d.vue')).toEqual(null);
    expect(resolveFullFilePath('/a/b/c')).toEqual(null);
    expect(resolveFullFilePath('/a/b/c.js')).toEqual(null);
  });
});