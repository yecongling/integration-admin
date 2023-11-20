/**
 * 编辑器对象
 */
export class TEmrEditor {

  /* 更新次数 */
  private _updateCount: number;


  constructor() {
    this._updateCount = 0;
  }


  get updateCount(): number {
    return this._updateCount;
  }

  set updateCount(value: number) {
    this._updateCount = value;
  }
}