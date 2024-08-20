import { makeAutoObservable } from "mobx";

/**
 * 全局的状态存储
 */
class GlobalStore {
    // 主题
    theme: 'dark' | 'light' = "light";
    // 侧边栏收缩
    collapse: boolean = false;
    // 默认颜色
    colorPrimary: string = "#1677ff";
    // 菜单
    menus: any[] = [];
    constructor() {
        makeAutoObservable(this);
    }

    setTheme(theme: 'dark' | 'light') {
        this.theme = theme;
    }

    setCollapse(collapse: boolean) {
        this.collapse = collapse;
    }

    setColorPrimary(colorPrimary: string) {
        this.colorPrimary = colorPrimary;
    }

    setMenus(menus: any[]) {
        this.menus = menus;
    }
}

const globalStore = new GlobalStore();
export default globalStore;