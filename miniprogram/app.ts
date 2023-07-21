// app.ts
// App<IAppOption>({
import { IOPT } from "./type";
import { getStorage, getStorageAsync, setStorageAsync, getRecordsStorage, deleteStorageAsync } from "./utils/cache";

App<IAppOption>({
    data: {
        loaded: false,
    },
    style: {
        bgColor: "#CDE1FD",
    },
    user: {},
    cache: {},
    currentGroup: "",
    groups: [],
    records: {},
    setting: {
        enableInspection: true,
        inspectionTime: 15,
    },
    systemInfo: wx.getSystemInfoSync(),
    menuButtonInfo: wx.getMenuButtonBoundingClientRect(),
    async onLaunch() {
        this.loadLoginState();
        this.loadStyleState();
        this.groups = getStorage("groups") ?? ["normal"];
        this.currentGroup = getStorage("currentGroup") ?? this.groups[0];
        const storage = await getRecordsStorage(this.groups);
        storage.forEach((value, idx) => {
            this.records[this.groups[idx]] = value as IRecord[];
        });
        this.data.loaded = true;
        this.onLoadData();
        wx.showShareMenu({
            withShareTicket: true,
            menus: ["shareAppMessage", "shareTimeline"],
        });
    },
    loadStyleState() {
        getStorageAsync("style")
            .then((style) => {
                this.style = style;
            })
            .catch((err) => {
                console.log(err);
            });
    },
    loadLoginState() {
        getStorageAsync("user")
            .then((res) => {
                if (res.expiration > Date.now()) {
                    this.user = res;
                }
            })
            .catch((err) => {
                console.log(err);
            });
    },
    storeLoginState() {
        const expiration = Date.now() + 18000000; // 300min or 5h;
        setStorageAsync("user", { ...this.user, expiration });
    },
    onLoadData() {},
    handleChangeTest() {},
    addRecord(record: IRecord) {
        this.records[this.currentGroup].unshift(record);
        setStorageAsync(this.currentGroup, this.records[this.currentGroup]);
    },
    deleteRecord(ids: []) {
        this.records[this.currentGroup] = this.records[this.currentGroup].filter((record) => {
            return !ids.includes(record.id as never);
        });
        setStorageAsync(this.currentGroup, this.records[this.currentGroup]);
    },
    deleteCurrentRecord() {
        this.records[this.currentGroup].shift();
        setStorageAsync(this.currentGroup, this.records[this.currentGroup]);
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
        setStorageAsync(this.currentGroup, this.records[this.currentGroup]);
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
        setStorageAsync(this.currentGroup, this.records[this.currentGroup]);
    },
    clearRecord() {
        this.records[this.currentGroup] = [];
        setStorageAsync(this.currentGroup, this.records[this.currentGroup]);
    },
    changeGroup(idx: number) {
        this.currentGroup = this.groups[idx];
    },
    addGroup(name: string): boolean {
        if (this.groups.includes(name)) {
            return false;
        }
        this.groups.unshift(name);
        this.records[name] = [];
        this.currentGroup = name;
        console.log(this.groups, this.records[name], name, this.currentGroup);
        setStorageAsync(name, this.records[name]);
        return true;
    },
    updateGroupName(idx: number, name: string) {
        console.log("updateGroupName", idx, name);
        // 重命名为已存在的名字,合并两组的数据
        if (this.groups.includes(name)) {
            const oldName = this.groups[idx];
            this.records[name] = [...this.records[name], ...this.records[oldName]];
            this.deleteGroup(idx);
            this.currentGroup = name;
        } else {
            const oldName = this.groups[idx];
            if (oldName == this.currentGroup) {
                this.currentGroup = name;
            }
            this.records[name] = this.records[oldName];
            this.groups[idx] = name;
            deleteStorageAsync(oldName);
            delete this.records[oldName];
        }
        setStorageAsync("groups", this.groups);
        setStorageAsync(name, this.records[name]);
    },
    deleteGroup(idx: number) {
        console.log("delete group", idx, name, this.groups);
        const name = this.groups[idx];
        this.groups = this.groups.filter((value) => value != name);
        deleteStorageAsync(name);
        delete this.records[name];
        if (name == this.currentGroup) {
            this.currentGroup = this.groups[0];
        }
    },
    handleSyncDown(data: Object) {
        const { records, currentGroup, groups } = data;
        console.log(data);
        Object.keys(records).forEach((key) => {
            this.records[key] = records[key];
            setStorageAsync(key, this.records[key]);
        });
        groups.forEach((name: string) => {
            if (!this.groups.includes(name)) {
                this.groups.unshift(name);
            }
        });
        this.currentGroup = currentGroup;
        setStorageAsync("groups", this.groups);
        setStorageAsync("currentGroup", this.currentGroup);
    },
    updateTheme(color) {
        this.style.bgColor = color;
        setStorageAsync("style", this.style);
    },
});
