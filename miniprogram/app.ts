// app.ts
// App<IAppOption>({
import { IOPT } from "./type";
import { getStorage, setStorage, setStorageAsync } from "./utils/cache";

App<IAppOption>({
    data: {
    },
    currentGroup: "normal",
    groups: {},
    records: {
        normal: [],
    },
    setting: {
        enableInspection: true,
        inspectionTime: 15,
    },
    systemInfo: wx.getSystemInfoSync(),
    menuButtonInfo: wx.getMenuButtonBoundingClientRect(),
    async onLaunch() {
        this.records = (await getStorage(this.currentGroup)) ?? {
            normal: [],
        };
    },
    handleChangeTest() {},
    addRecord(record: IRecord) {
        this.records[this.currentGroup].unshift(record);
        setStorageAsync(this.currentGroup, this.records);
    },
    deleteRecord(ids: []) {
        this.records[this.currentGroup] = this.records[this.currentGroup].filter((record) => {
            return !ids.includes(record.id);
        });
        setStorageAsync(this.currentGroup, this.records);
    },
    deleteCurrentRecord() {
        this.records[this.currentGroup].shift();
        setStorageAsync(this.currentGroup, this.records);
    },
    updateRecord(id: number, newVal: Object) {
        const tot = this.records[this.currentGroup].length;
        for (let i = 0; i < tot; i++) {
            if (id === this.records[this.currentGroup][i].id) {
                this.records[this.currentGroup][i] = {
                    ...this.records[this.currentGroup][i],
                    ...newVal,
                };
            }
        }
        setStorageAsync(this.currentGroup, this.records);
    },
    updateCurrentRecord(opt: IOPT) {
        switch (opt) {
            case IOPT.ADD2:
                this.records[this.currentGroup][0].isAdd2 = true;
                break;
            case IOPT.DNF:
                this.records[this.currentGroup][0].isDNF = true;
                break;
            case IOPT.REMOVE_ADD2:
                this.records[this.currentGroup][0].isAdd2 = false;
                break;
            case IOPT.REMOVE_DNF:
                this.records[this.currentGroup][0].isDNF = false;
                this.records[this.currentGroup][0].isAdd2 = false;
                break;
            default:
                break;
        }
        setStorageAsync(this.currentGroup, this.records);
    },
    cache: {},
});
