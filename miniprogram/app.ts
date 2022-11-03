// app.ts
// App<IAppOption>({
import { MODE, IOPT } from "./type";
import { getStorage, setStorage, setStorageAsync } from "./utils/cache";

App<IAppOption>({
    data: {
        mode: MODE.TIMER,
    },
    cubeType: "cube3",
    currentGroup: "normal",
    groups: {},
    records: {
        cube3: {
            normal: [],
        },
    },
    setting: {
        enableInspection: true,
        inspectionTime: 15,
    },
    systemInfo: wx.getSystemInfoSync(),
    menuButtonInfo: wx.getMenuButtonBoundingClientRect(),
    async onLaunch() {
        this.records[this.cubeType] = (await getStorage(this.cubeType)) ?? {
            normal: [],
        };
    },
    handleChangeTest() {},
    addRecord(record: IRecord) {
        this.records[this.cubeType][this.currentGroup].unshift(record);
        setStorageAsync(this.cubeType, this.records[this.cubeType]);
    },
    deleteRecord(ids: []) {
        this.records[this.cubeType][this.currentGroup] = this.records[this.cubeType][this.currentGroup].filter(
            (record) => {
                return !ids.includes(record.id);
            }
        );
        setStorageAsync(this.cubeType, this.records[this.cubeType]);
    },
    deleteCurrentRecord() {
        this.records[this.cubeType][this.currentGroup].shift();
        setStorageAsync(this.cubeType, this.records[this.cubeType]);
    },
    updateRecord(id, newVal) {
        const tot = this.records[this.cubeType][this.currentGroup].length;
        for (let i = 0; i < tot; i++) {
            if (id === this.records[this.cubeType][this.currentGroup][i].id) {
                this.records[this.cubeType][this.currentGroup][i] = {
                    ...this.records[this.cubeType][this.currentGroup][i],
                    ...newVal,
                };
            }
        }
        setStorageAsync(this.cubeType, this.records[this.cubeType]);
    },
    updateCurrentRecord(opt: IOPT) {
        switch (opt) {
            case IOPT.ADD2:
                this.records[this.cubeType][this.currentGroup][0].isAdd2 = true;
                break;
            case IOPT.DNF:
                this.records[this.cubeType][this.currentGroup][0].isDNF = true;
                break;
            case IOPT.REMOVE_ADD2:
                this.records[this.cubeType][this.currentGroup][0].isAdd2 = false;
                break;
            case IOPT.REMOVE_DNF:
                this.records[this.cubeType][this.currentGroup][0].isDNF = false;
                this.records[this.cubeType][this.currentGroup][0].isAdd2 = false;
                break;
            default:
                break;
        }
        setStorageAsync(this.cubeType, this.records[this.cubeType]);
    },
    cache: {},
});
