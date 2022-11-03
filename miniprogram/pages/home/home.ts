// home.ts
// 获取应用实例
import { IOPT, ITimerState } from "../../type";
// @ts-ignore
const app = getApp<IAppOption>();

Page({
    data: {
        currentTabIndex: 0,
        isHiddenSideBlock: true,
        records: app.records[app.cubeType][app.currentGroup],
        isShowRecordPopper: false,
        isShowConfirmPopper: false,
        timerState: ITimerState.Off,
        popperRecord: {},
        confirmCallback: () => {},
        confirmPopperTitle: "确定删除成绩？",
        confirmPopperOkText: "删除",
    },
    handleTabChange(e: any) {
        this.setData({
            currentTabIndex: e.detail.current,
        });
    },
    handleClickTab(e: any) {
        this.setData({
            currentTabIndex: e.detail.index,
        });
    },
    onLoad() {},
    onShow() {},
    onChangeTimerState(e) {
        const newState = e.detail.newState;
        this.setData({
            timerState: newState,
        });
    },
    onAddRecord(e: any) {
        console.log("add new record", e.detail.record);
        app.addRecord(e.detail.record);
        this.setData({
            records: app.records[app.cubeType][app.currentGroup],
        });
    },
    handelShowRecordPopper(e) {
        this.setData({
            popperRecord: e.detail.record,
            isShowRecordPopper: true,
        });
    },
    handleCloseRecordPopper() {
        this.setData({
            isShowRecordPopper: false,
        });
    },
    handleHideConfirmPopper() {
        this.setData({
            isShowConfirmPopper: false,
        });
    },

    handleUpdateRecordItem(e) {
        const { id, opt } = e.detail;
        switch (opt) {
            case IOPT.DELETE:
                app.deleteRecord([id]);
                break;
            case IOPT.DNF:
                app.updateRecord(id, { isDNF: true, isAdd2: false });
                break;
            case IOPT.ADD2:
                app.updateRecord(id, { isDNF: false, isAdd2: true });
                break;
            case IOPT.REMOVE_DNF:
            case IOPT.REMOVE_ADD2:
                app.updateRecord(id, { isDNF: false, isAdd2: false });
                break;
        }
        this.setData({
            records: app.records[app.cubeType][app.currentGroup],
            isShowRecordPopper: false,
        });
    },
    handleUpdateRecord(e) {
        const opt = e.detail.opt;
        switch (opt) {
            case IOPT.DELETE:
                this.setData({
                    isShowConfirmPopper: true,
                    confirmCallback: () => {
                        app.deleteCurrentRecord();
                        this.setData({
                            records: app.records[app.cubeType][app.currentGroup],
                        });
                        e.detail.callback();
                    },
                });
                break;
            case IOPT.DNF:
                app.updateCurrentRecord(IOPT.DNF);
                this.setData({
                    records: app.records[app.cubeType][app.currentGroup],
                });
                e.detail.callback();
                break;
            case IOPT.ADD2:
                if (app.records[app.cubeType][app.currentGroup][0].isAdd2 === false) {
                    app.updateCurrentRecord(IOPT.ADD2);
                    this.setData({
                        records: app.records[app.cubeType][app.currentGroup],
                    });
                }
                e.detail.callback();
                break;
            case IOPT.REMOVE_DNF:
                app.updateCurrentRecord(IOPT.REMOVE_DNF);
                this.setData({
                    records: app.records[app.cubeType][app.currentGroup],
                });
                e.detail.callback();
                break;
            case IOPT.REMOVE_ADD2:
                app.updateCurrentRecord(IOPT.REMOVE_ADD2);
                this.setData({
                    records: app.records[app.cubeType][app.currentGroup],
                });
                e.detail.callback();
                break;
            case "comment":
                break;
        }
    },
    methods: {},
});
