// home.ts
import { IOPT, ITimerState } from "../../type";
import { getStatistic } from "../../utils/util";
// 获取应用实例
// @ts-ignore
const app = getApp<IAppOption>();

Component({
    data: {
        currentTabIndex: 0,
        isHiddenSideBlock: true,
        records: app.records[app.currentGroup],
        isShowRecordPopper: false,
        timerState: ITimerState.Off,
        popperRecord: {},
        isShowConfirmPopper: false,
        confirmPopperTitle: "确定删除成绩？",
        confirmPopperOkText: "删除",
        confirmCallback: () => {},
        recordsStatistic: getStatistic(app.records[app.currentGroup]),
    },
    lifetimes: {},
    observers: {
        records: function (newRecords) {
            this.setData({
                recordsStatistic: getStatistic(newRecords),
            });
        },
    },
    methods: {
        handleTabChange(e: WechatMiniprogram.CustomEvent) {
            this.setData({
                currentTabIndex: e.detail.current,
            });
        },
        handleClickTab(e: WechatMiniprogram.TouchEvent) {
            this.setData({
                currentTabIndex: e.detail.index,
            });
        },
        onChangeTimerState(e: WechatMiniprogram.CustomEvent) {
            const newState = e.detail.newState;
            this.setData({
                timerState: newState,
            });
        },
        onAddRecord(e: WechatMiniprogram.CustomEvent) {
            console.log("add new record", e.detail.record);
            app.addRecord(e.detail.record);
            this.setData({
                records: app.records[app.currentGroup],
            });
        },
        handelShowRecordPopper(e: WechatMiniprogram.CustomEvent) {
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
        handleUpdateRecordItem(e: WechatMiniprogram.CustomEvent) {
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
                records: app.records[app.currentGroup],
                isShowRecordPopper: false,
            });
        },
        handleUpdateRecord(e: WechatMiniprogram.CustomEvent) {
            const opt = e.detail.opt;
            switch (opt) {
                case IOPT.DELETE:
                    this.setData({
                        isShowConfirmPopper: true,
                        confirmCallback: () => {
                            app.deleteCurrentRecord();
                            this.setData({
                                records: app.records[app.currentGroup],
                            });
                            e.detail.callback();
                        },
                    });
                    break;
                case IOPT.DNF:
                    app.updateCurrentRecord(IOPT.DNF);
                    this.setData({
                        records: app.records[app.currentGroup],
                    });
                    e.detail.callback();
                    break;
                case IOPT.ADD2:
                    if (app.records[app.currentGroup][0].isAdd2 === false) {
                        app.updateCurrentRecord(IOPT.ADD2);
                        this.setData({
                            records: app.records[app.currentGroup],
                        });
                    }
                    e.detail.callback();
                    break;
                case IOPT.REMOVE_DNF:
                    app.updateCurrentRecord(IOPT.REMOVE_DNF);
                    this.setData({
                        records: app.records[app.currentGroup],
                    });
                    e.detail.callback();
                    break;
                case IOPT.REMOVE_ADD2:
                    app.updateCurrentRecord(IOPT.REMOVE_ADD2);
                    this.setData({
                        records: app.records[app.currentGroup],
                    });
                    e.detail.callback();
                    break;
                case "comment":
                    break;
            }
        },
        onClearGroup() {
            this.setData({
                isShowConfirmPopper: true,
                confirmPopperTitle: "确定清空该组所有记录?",
                confirmPopperOkText: "确定",
                confirmCallback: () => {
                    app.clearRecord();
                    this.setData({
                        records: app.records[app.currentGroup],
                    });
                },
            });
        },
    },
});
