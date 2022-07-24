/// <reference path="./types/index.d.ts" />

interface IAppOption {
    globalData: { test: number };
    systemInfo: WechatMiniprogram.SystemInfo;
    menuButtonInfo: any;
    historyData: Object[];
    handleChangeTest: () => void;
}
