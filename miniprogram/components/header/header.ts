// @ts-ignore
const app = getApp<IAppOption>();

Component({
    data: {
        cubeType: "三阶魔方",
        currentGroup: "normal",
        statusBarHeight: app.systemInfo.statusBarHeight,
        headerHeight: 2 * (app.menuButtonInfo.top - app.systemInfo.statusBarHeight) + app.menuButtonInfo.height,
    },
    methods: {
        handleTapSetting() {
            // wx.navigateTo({
            //     url: "/pages/user/user",
            // });
        },
        handleSwitchGroup() {},
    },
});
