const app = getApp<IAppOption>();

Page({
    data: {
        isLogin: false,
        statusBarHeight: app.systemInfo.statusBarHeight,
        navBarHeight: app.menuButtonInfo.bottom + app.menuButtonInfo.top - 2 * app.systemInfo.statusBarHeight,
        userAvatar: "",
        userName: "Hailin",
        entryList: [
            { icon: "icon-timer", title: "计时器", mode: "计时器" },
            {
                icon: "icon-healing",
                title: "训练器",
                isComposed: true,
                isOpen: false,
                mode: "训练器",
                childEntryList: [
                    { icon: "icon-timer", title: "OLL", mode: "训练器OLL" },
                    { icon: "icon-timer", title: "PLL", mode: "训练器PLL" },
                ],
            },
            {
                icon: "icon-layers",
                title: "公式库",
                isComposed: true,
                isOpen: false,
                mode: "公式库",
                childEntryList: [
                    { icon: "icon-timer", title: "OLL", mode: "公式库OLL" },
                    { icon: "icon-timer", title: "PLL", mode: "公式库PLL" },
                ],
            },
            { line: true },
            { icon: "icon-folder-add-line", title: "导入/导出", link: "/" },
            { icon: "icon-paint_outlined", title: "主题配色", link: "/" },
            { icon: "icon-palette-line", title: "魔方配色", link: "/" },
            { line: true },
            { icon: "icon-settings-4-line", title: "设置", link: "/" },
            { icon: "icon-helpoutline", title: "关于与反馈", link: "/" },
        ],
        currentMode: "计时器",
    },
    handleTapBack() {
        wx.navigateBack();
    },
    handleTapLoginBtn() {
        wx.login({
            success: (res) => {
                console.log(res);
                if (res.code) {
                }
            },
        });
    },
    handleTapEntry(e) {
        const type = e.target.dataset.type;
        const index = e.target.dataset.index;
        console.log(type, index);

        if (type === this.data.currentMode) {
            return;
        }
        switch (type) {
            case "计时器":
                this.setData({
                    currentMode: type,
                });
                break;
            case "训练器":
            case "公式库":
                console.log(this.data.entryList[index].isOpen);
                this.setData({
                    [`entryList[${index}].isOpen`]: !this.data.entryList[index].isOpen,
                });
                break;
            case "训练器OLL":
            case "训练器PLL":
            case "公式库OLL":
            case "公式库PLL":
                this.setData({
                    currentMode: type,
                });
                break;
            default:
                break;
        }
    },
});
