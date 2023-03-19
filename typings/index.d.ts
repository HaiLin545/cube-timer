/// <reference path="./types/index.d.ts" />

interface IAppOption {
    data: {  };
    systemInfo: WechatMiniprogram.SystemInfo;
    menuButtonInfo: any;
    records: {
        [group: string]: Array<IRecord>;
    };
    setting: ISetting;
    handleChangeTest: () => void;
    addRecord: Function;
    deleteRecord: Function;
    updateRecord: Function;
    deleteCurrentRecord: Function;
    updateCurrentRecord: Function;
    clearRecord: Function;
    cache: Object;
    groups: Object;
    currentGroup: string;
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


interface ISetting{
    enableInspection: boolean;
    inspectionTime: number;
}