import { MODE } from "../../type";

//@ts-ignore
const app = getApp<IAppOption>();

Page({
    data: {
        currentMode: "",
        delayTransition: false,
        isLogin: false,
        statusBarHeight: app.systemInfo.statusBarHeight,
        navBarHeight: app.menuButtonInfo.bottom + app.menuButtonInfo.top - 2 * app.systemInfo.statusBarHeight,
        userAvatar: "",
        userName: "Hailin",
        entryList: [
            { icon: "icon-timer", title: "计时器", mode: MODE.TIMER },
            {
                icon: "icon-healing",
                title: "训练器",
                isComposed: true,
                isOpen: false,
                mode: MODE.PRATICE,
                childEntryList: [
                    { icon: "icon-timer", title: "OLL", mode: MODE.PRATICE_OLL },
                    { icon: "icon-timer", title: "PLL", mode: MODE.PRATICE_PLL },
                ],
            },
            {
                icon: "icon-layers",
                title: "公式库",
                isComposed: true,
                isOpen: false,
                mode: MODE.FORMULA,
                childEntryList: [
                    { icon: "icon-timer", title: "OLL", mode: MODE.FORMULA_OLL },
                    { icon: "icon-timer", title: "PLL", mode: MODE.FORMULA_PLL },
                ],
            },
            { icon: "icon-folder-add-line", title: "导入/导出", link: "/" },
            { icon: "icon-paint_outlined", title: "主题配色", link: "/" },
            { icon: "icon-palette-line", title: "魔方配色", link: "/" },
            { icon: "icon-settings-4-line", title: "设置", link: "/" },
            { icon: "icon-helpoutline", title: "关于与反馈", link: "/" },
        ],
    },
    handleTapBack() {
        wx.navigateBack();
    },
    handleTapLoginBtn() {
        wx.login({
            success: (res) => {
                if (res.code) {
                }
            },
        });
    },
    handleTapEntry(e) {
        const type = e.target.dataset.type;
        const index = e.target.dataset.index;
        if (type === this.data.currentMode) {
            return;
        }
        switch (type) {
            case MODE.TIMER:
            case MODE.FORMULA_OLL:
            case MODE.FORMULA_PLL:
            case MODE.PRATICE_OLL:
            case MODE.PRATICE_PLL:
                this.setData({
                    currentMode: type,
                });
                app.data.mode = type;
                break;
            case MODE.PRATICE:
            case MODE.FORMULA:
                this.setData({
                    [`entryList[${index}].isOpen`]: !this.data.entryList[index].isOpen,
                });
                break;
            default:
                break;
        }
    },
    onLoad() {
        // 处理选中MODE的样式
        const mode = app.data.mode;
        const isOpen_1 = mode === MODE.PRATICE_OLL || mode === MODE.PRATICE_PLL;
        const isOpen_2 = mode === MODE.FORMULA_OLL || mode === MODE.FORMULA_PLL;
        this.setData({
            currentMode: mode,
            delayTransition: !isOpen_1 && !isOpen_2,
            [`entryList[1].isOpen`]: isOpen_1,
            [`entryList[2].isOpen`]: isOpen_2,
        });
        // 使用delayTransition来暂时取消transition，避免刚进入用户页就产生动画
        if (!this.data.delayTransition) {
            setTimeout(() => {
                this.setData({
                    delayTransition: true,
                });
            }, 100);
        }
    },
});
