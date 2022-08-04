// home.ts
// 获取应用实例

// @ts-ignore
const app = getApp<IAppOption>();

Page({
    data: {
        currentTabIndex: 0,
        isHiddenSideBlock: true,
        records: app.records,
    },
    handleTabChange(e: any) {
        console.log("tabindex改变为", e.detail.current);
        this.setData({
            currentTabIndex: e.detail.current,
        });
    },
    handleClickTab(e: any) {
        console.log("onClickTab is captured", e.detail.index);
        this.setData({
            currentTabIndex: e.detail.index,
        });
    },
    onLoad() {},
    onShow() {},
    onAddRecord(e: any) {
        console.log(e);
        app.addRecord(e.detail.record, this);
    },
    methods: {},
});
