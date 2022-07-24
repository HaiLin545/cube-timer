// logs.ts

const app = getApp<IAppOption>();

Page({
    data: {
        records: app.historyData,
    },
    onLoad() {},
    handleTap() {
        const record = {
            data: Date(),
            score: (Math.random() * 5 + 8.0).toFixed(2),
        };
        app.historyData.unshift(record);
        this.setData({
            records: app.historyData,
        });
    },
    onShow() {
        if (typeof this.getTabBar === "function" && this.getTabBar()) {
            this.getTabBar().setData({
                selected: 1,
            });
        }
        this.setData({
            records: app.historyData,
        });
    },
});
