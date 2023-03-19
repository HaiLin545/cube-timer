// @ts-ignore
const app = getApp<IAppOption>();

Component({
    properties: {
        currentTabIndex: Number,
        recordLength: Number,
    },
    data: {
        currentGroup: "normal",
        statusBarHeight: app.systemInfo.statusBarHeight,
        headerHeight: 2 * (app.menuButtonInfo.top - app.systemInfo.statusBarHeight) + app.menuButtonInfo.height,
    },
    methods: {
        handleTapSetting() {
            wx.navigateTo({
                url: "/pages/user/user",
            });
        },
        handleSwitchGroup() {},
        handleClearGroup() {
            console.log("record length", this.properties.recordLength);
            this.triggerEvent("clearGroup");
        },
    },
});
