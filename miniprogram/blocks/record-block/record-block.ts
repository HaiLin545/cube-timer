//@ts-ignore
const app = getApp<IAppOption>();

Component({
    properties: {},
    data: {
        records: app.historyData,
    },
    methods: {
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
    },
    lifetimes: {},
});
