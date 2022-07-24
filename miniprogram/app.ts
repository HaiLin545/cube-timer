// app.ts
// App<IAppOption>({
App({
    globalData: {
        test: 1,
    },
    historyData: [
        {
            date: "2022/7/24 17:45:00",
            score: "12.12",
        },
        {
            date: "2022/7/24 17:46:00",
            score: "11.88",
        },
        {
            date: "2022/7/24 17:47:00",
            score: "11.22",
        },
    ],

    systemInfo: wx.getSystemInfoSync(),
    menuButtonInfo: wx.getMenuButtonBoundingClientRect(),
    onLaunch() {},
    handleChangeTest() {},
});
