// app.ts
// App<IAppOption>({
import { MODE } from "./type";
import { getStorage, setStorage, setStorageAsync } from "./utils/cache";

App<IAppOption>({
    data: {
        mode: MODE.TIMER,
    },
    records: [],
    systemInfo: wx.getSystemInfoSync(),
    menuButtonInfo: wx.getMenuButtonBoundingClientRect(),
    async onLaunch() {
        this.records = (await getStorage("records")) ?? [];
    },
    handleChangeTest() {},
    addRecord(record: IRecord) {
        this.records.unshift(record);
        setStorageAsync("records", this.records);
    },
    cache: {},
});
