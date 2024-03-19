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

  test('不存在', async () => {
    jest.mock('fs', () => {
      const fs:any = jest.createMockFromModule('fs');
      fs.existsSync = (f:string) => f === '/a/b/d.js';
      return fs;
    });

    const { resolveFullFilePath } = await import('@/utils/resolve-full-file-path');
    expect(resolveFullFilePath('/a/b/d')).toEqual('/a/b/d.js');
    expect(resolveFullFilePath('/a/b/d.js')).toEqual('/a/b/d.js');
    expect(resolveFullFilePath('/a/b/d.vue')).toEqual('/a/b/d.vue');
    expect(resolveFullFilePath('/a/b/c')).toEqual('/a/b/c');
    expect(resolveFullFilePath('/a/b/c.js')).toEqual('/a/b/c.js');
  });
});