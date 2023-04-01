/// <reference path="./types/index.d.ts" />

interface IAppOption {
    data: {
        loaded: boolean;
    };
    user: {
        isLogin: boolean;
        openId: string;
        sessionKey: string;
        avatar: string;
        nickName: string;
    };
    systemInfo: WechatMiniprogram.SystemInfo;
    menuButtonInfo: any;
    records: {
        [group: string]: Array<IRecord>;
    };
    style: {
        bgColor: string;
    };
    setting: ISetting;
    cache: Object;
    groups: Array<string>;
    currentGroup: string;
    onLoadData: Function;
    handleChangeTest: () => void;
    addRecord: Function;
    deleteRecord: Function;
    updateRecord: Function;
    deleteCurrentRecord: Function;
    updateCurrentRecord: Function;
    clearRecord: Function;
    changeGroup: Function;
    addGroup: Function;
    updateGroupName: Function;
    deleteGroup: Function;
    handleSyncDown: Function;
    storeLoginState: Function;
    loadLoginState: Function;
    loadStyleState: Function;
    updateTheme: Function;
}

interface IRecord {
    date: Date;
    id: number;
    time: number;
    day: string;
    isDNF: boolean;
    isAdd2: boolean;
    isValid: boolean;
}

interface ISetting {
    enableInspection: boolean;
    inspectionTime: number;
}
