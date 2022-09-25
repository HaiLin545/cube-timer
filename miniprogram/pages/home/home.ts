// home.ts
// 获取应用实例

// @ts-ignore
const app = getApp<IAppOption>();

Page({
    data: {
        currentTabIndex: 0,
        isHiddenSideBlock: true,
        records: app.records[app.cubeType][app.currentGroup],
        isShowRecordPopper: false,
        popperRecord: {},
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
        console.log("add new record", e.detail.record);
        app.addRecord(e.detail.record);
        this.setData({
            records: app.records[app.cubeType][app.currentGroup],
        });
    },
    handelShowRecordPopper(e) {
        console.log("showRecordPopper", e.detail.record);
        this.setData({
            popperRecord: e.detail.record,
        });
        this.setData({
            isShowRecordPopper: true,
        });
    },
    handleCloseRecordPopper() {
        console.log("closeRecordPopper");
        this.setData({
            isShowRecordPopper: false,
        });
    },
    handleDeleteRecordItem(e) {
        console.log("deleteRecordItem", e.detail);
        app.deleteRecord([e.detail.id]);
        this.setData({
            records: app.records[app.cubeType][app.currentGroup],
        });
        this.setData({
            isShowRecordPopper: false,
        });
    },

    methods: {},
});
