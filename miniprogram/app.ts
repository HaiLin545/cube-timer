// app.ts
// App<IAppOption>({
import { MODE } from "./type";
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
        inspectionTime: 5,
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
    cache: {},
});
