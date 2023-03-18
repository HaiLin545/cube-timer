/// <reference path="./types/index.d.ts" />

declare enum MODE {
    TIMER = "TIMER",
    PRATICE = "PRATICE",
    FORMULA = "FORMULA",
    PRATICE_OLL = "PRATICE_OLL",
    PRATICE_PLL = "PRATICE_PLL",
    FORMULA_OLL = "FORMULA_OLL",
    FORMULA_PLL = "FORMULA_PLL",
}

interface IAppOption {
    data: { mode: MODE };
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