// @ts-ignore
const app = getApp<IAppOption>();

Component({
    properties: {
        currentTabIndex: Number,
        recordLength: Number,
        currentGroup: String,
    },
    data: {
        statusBarHeight: app.systemInfo.statusBarHeight,
        headerHeight: 2 * (app.menuButtonInfo.top - app.systemInfo.statusBarHeight) + app.menuButtonInfo.height,
    },
    methods: {
        handleTapSetting() {
            wx.navigateTo({
                url: "/pages/user/user",
            });
        },
        handleSwitchGroup() {
            this.triggerEvent("showGroupPopper");
        },
        handleClearGroup() {
            this.triggerEvent("clearGroup");
        },
    },
});
