/**
 * 核心基类，封装抽象的一些内容
 *
 */
export class TObject {

  private _className: string;

  constructor() {
    this._className = this.constructor.name;
  }

  isClass(cls: any) {
    return this instanceof cls;
  }

  set className(value: string) {
    this._className = value;
  }

  get className(): string {
    return this._className;
  }
}