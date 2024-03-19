import fs from 'fs';

type Options = {
  outDir?:string,
  files?: string[],
  baseUrl?: string,
  paths?: string,
  rootDir?: string
}

export const genTsconfig = (filePath:string, { outDir, files = [], baseUrl, paths, rootDir }:Options) => {
  const tsconfig:any = {
    compilerOptions: {
      declaration: true,
      emitDeclarationOnly: true,
      allowJs: true,
      strict: false,
      noImplicitAny: false,
      esModuleInterop: true,
      skipLibCheck: true,
      module: 'ESNext',
      target: 'ESNext',
      moduleResolution: 'node',
      include: files
    }
  };

  outDir && (tsconfig.compilerOptions.outDir = outDir);
  rootDir && (tsconfig.compilerOptions.rootDir = rootDir);
  baseUrl && (tsconfig.compilerOptions.baseUrl = baseUrl);
  paths && (tsconfig.compilerOptions.paths = paths);

  fs.writeFileSync(filePath, JSON.stringify(tsconfig, null, 2));
};