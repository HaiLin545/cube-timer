// app.ts
// App<IAppOption>({
import { MODE } from "./type";

App<IAppOption>({
    data: {
        mode: MODE.TIMER,
    },
    records: [],

    systemInfo: wx.getSystemInfoSync(),
    menuButtonInfo: wx.getMenuButtonBoundingClientRect(),
    onLaunch() {},
    handleChangeTest() {},
    addRecord(record: IRecord, page: any) {
        this.records.unshift(record);
        page.setData({
            records: this.records,
        });
    },
});
