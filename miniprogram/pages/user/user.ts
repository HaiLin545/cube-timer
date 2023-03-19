
//@ts-ignore
const app = getApp<IAppOption>();

Page({
    data: {
        delayTransition: false,
        isLogin: false,
        statusBarHeight: app.systemInfo.statusBarHeight,
        navBarHeight: app.menuButtonInfo.bottom + app.menuButtonInfo.top - 2 * app.systemInfo.statusBarHeight,
        userAvatar: "",
        userName: "Hailin",
        entryList: [
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
    },
    onLoad() {},
});
