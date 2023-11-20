import {TEmrCursors} from "@/components/emr/view/enums/TEmrCursors";

/**
 * 形状基类
 * 其子类可能为矩形、圆形等
 */
export class TEmrShape {
  /* 是否激活状态 */
  private _isActive: boolean;
  /* 光标形状 */
  private _cursor: TEmrCursors;

  constructor(isActive: boolean) {
    this._isActive = isActive;
    this._cursor = TEmrCursors.Default;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  set isActive(value: boolean) {
    this._isActive = value;
  }

  get cursor(): TEmrCursors {
    return this._cursor;
  }

  set cursor(value: TEmrCursors) {
    this._cursor = value;
  }
}