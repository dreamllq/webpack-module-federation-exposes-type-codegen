import path from 'path';
import fs from 'fs';
import { Command } from 'commander';

const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
const program = new Command();

program
  .name('alsi')
  .description('alsi 微前端框架cli')
  .version(pkg.version);

program
  .option('-o, --outDir <outDir>', 'outDir')
  .action(async (options) => {
    const test = await import('./commanders/test');
    test.default();
  });

program.parse(process.argv);
