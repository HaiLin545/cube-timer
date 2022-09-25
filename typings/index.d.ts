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
    records: Object[];
    handleChangeTest: () => void;
    addRecord: Function;
    cache: Object;
}

interface IRecord {
    date: Date;
    id: string;
    score: string;
    day: string;
}
