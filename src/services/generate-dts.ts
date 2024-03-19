import path from 'path';
import { spawnSync } from 'child_process';
import { genTsconfig } from './generate-tsconfig';

type Options = {
  outDir?:string,
  files?: string[],
  baseUrl?: string,
  paths?: string,
  rootDir?: string
}

export const genDTS = (options:Options) => {
  const command = path.join(process.cwd(), 'node_modules', '.bin', 'vue-tsc');
  const configFilePath = path.join(__dirname, 'tsconfig.json');

  genTsconfig(configFilePath, {
    files: options.files,
    outDir: options.outDir,
    baseUrl: options.baseUrl,
    paths: options.paths,
    rootDir: options.rootDir 
  });

  spawnSync(command, ['-p', configFilePath], {
    cwd: process.cwd(),
    stdio: [
      process.stdin,
      process.stdout,
      process.stderr
    ],
    shell: process.platform === 'win32'
  });

  spawnSync(path.join(process.cwd(), 'node_modules', '.bin', 'resolve-tspaths'), [
    '-p',
    configFilePath,
    '--verbose'
  ], {
    cwd: process.cwd(),
    // stdio: [process.stdin, process.stdout, process.stderr],
    shell: process.platform === 'win32'
  });
};