import { transformExposes } from '@/utils/transform-exposes';
import { Exposes, ObjectExposes } from './type';
import { resolveExposesFullPath } from '@/utils/resolve-exposes-full-path';
import path from 'path';
import { genDTS } from './generate-dts';

export class ExposesCodeGen {
  private _exposes:ObjectExposes = {};
  private _cwd:string = '';
  private _outDir:string = '';
  private _baseUrl: string = '';
  private _paths: any = undefined;
  private _rootDir: string = '';

  constructor(exposes:Exposes, options?:{cwd?: string, outDir?:string, baseUrl?:string, paths?:any, rootDir?:string}) {
    this._cwd = options?.cwd || process.cwd();
    this._outDir = options?.outDir || path.join(process.cwd(), 'exposes-type');
    this._baseUrl = options?.baseUrl || process.cwd();
    this._paths = options?.paths || undefined;
    this._rootDir = options?.rootDir || process.cwd();
    this._exposes = resolveExposesFullPath(transformExposes(exposes), { cwd: options?.cwd });
  }

  get exposesSourceFileList() {
    return Object.keys(this._exposes).map(key => this._exposes[key]);
  }

  _genDTS() {
    genDTS({
      files: this.exposesSourceFileList,
      baseUrl: this._baseUrl,
      outDir: this._outDir,
      paths: this._paths,
      rootDir: this._rootDir
    });
  }
}