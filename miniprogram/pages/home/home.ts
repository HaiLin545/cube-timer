// home.ts
// 获取应用实例

const app = getApp<IAppOption>();

Page({
    data: {
        currentTabIndex: 0,
        isHiddenSideBlock: true,
    },
    handleTabChange(e) {
        console.log("tabindex改变为", e.detail.current);
        this.setData({
            currentTabIndex: e.detail.current,
        });
    },
    handleClickTab(e) {
        console.log("onClickTab is captured", e.detail.index);
        this.setData({
            currentTabIndex: e.detail.index,
        });
    },
    onLoad() {},
    onShow() {},
    methods: {},
});
