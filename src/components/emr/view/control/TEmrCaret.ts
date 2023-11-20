/**
 * 光标类
 */
export class TEmrCaret {

  /* 光标所在容器 */
  private _container: HTMLDivElement;
  private _cursorDom: HTMLDivElement;

  /* 宽度 */
  private _width: number;
  /* 高度 */
  private _height: number;
  /* 位置 */
  private _top: number;
  /* 位置 */
  private _left: number;

  /* class集合(正常光标class、斜体等) */
  private _classList: Set<string> = new Set<string>();

  /* 是否可见 */
  private _visible: boolean;

  /* 样式 */
  private _style: Set<string> = new Set<string>();

  /* 光标颜色（跟随所在位置的字体颜色而定） */
  private _color: string;

  /* 光标闪烁频率 */
  private _blinkTimeout: number;
  /* 光标控制 */
  private _control: any;

  constructor(container: HTMLDivElement) {
    this._cursorDom = document.createElement("div");
    this._classList.add("emr-cursor");
    this._top = 0;
    this._left = 0;
    this._width = 0;
    this._height = 21.4648;
    this._style.add("transform(" + this._top + "px, " + this._left + "px)");
    this._visible = true;
    this._blinkTimeout = 500;
    this._color = "blank";
    this.setClassList();
    this._container = container;
    this._container.append(this._cursorDom);
  }

  /**
   * 设置class
   * @param classList
   */
  setClassList(classList?: Set<string>) {
    this._classList = new Set([...this._classList, ...classList || []]);
    this._classList.forEach((cls) => {
      this._cursorDom.classList.add(cls);
    })
  }

  /**
   * 重置光标
   */
  reset() {

  }

  /**
   * 绘制光标
   *
   */
  public drawCursor() {

  }


  get container(): HTMLDivElement {
    return this._container;
  }

  set container(value: HTMLDivElement) {
    this._container = value;
  }

  get cursorDom(): HTMLDivElement {
    return this._cursorDom;
  }

  set cursorDom(value: HTMLDivElement) {
    this._cursorDom = value;
  }

  get width(): number {
    return this._width;
  }

  set width(value: number) {
    this._width = value;
  }

  get height(): number {
    return this._height;
  }

  set height(value: number) {
    this._height = value;
  }

  get top(): number {
    return this._top;
  }

  set top(value: number) {
    this._top = value;
  }

  get left(): number {
    return this._left;
  }

  set left(value: number) {
    this._left = value;
  }


  get classList(): Set<string> {
    return this._classList;
  }

  set classList(value: Set<string>) {
    this._classList = value;
  }

  get blinkTimeout(): number {
    return this._blinkTimeout;
  }

  set blinkTimeout(value: number) {
    this._blinkTimeout = value;
  }


  get visible(): boolean {
    return this._visible;
  }

  set visible(value: boolean) {
    this._visible = value;
  }

  get color(): string {
    return this._color;
  }

  set color(value: string) {
    this._color = value;
  }

  get control(): any {
    return this._control;
  }

  set control(value: any) {
    this._control = value;
  }


  get style(): Set<string> {
    return this._style;
  }

  set style(value: Set<string>) {
    this._style = value;
  }
}