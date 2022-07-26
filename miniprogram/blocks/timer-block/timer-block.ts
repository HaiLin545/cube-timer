const app = getApp<IAppOption>();

Component({
    properties: {},
    data: {
        time: "0.00",
        isTiming: false,
        fixedBit: 2,
        timer: 0,
        disruption: "F2 R B2 L2 R U2 L F L2 R' D U B2 L U2 R D2 R2",
    },
    methods: {
        handleTap() {
            console.log("Tap the timer");
            this.data.isTiming ? this.endTiming() : this.startTiming();
        },
        startTiming() {
            console.log("start timing");
            this.setData({
                isTiming: true,
                time: "0.00",
                timer: setInterval(() => {
                    let tmp = Number(this.data.time);
                    tmp += 0.01;
                    this.setData({
                        time: tmp.toFixed(this.data.fixedBit),
                    });
                }, 10),
            });
        },
        endTiming() {
            console.log("end timing");
            clearInterval(this.data.timer);
            app.historyData.unshift({
                date: Date.now().toString(),
                score: this.data.time,
            });
            this.setData({
                isTiming: false,
                timer: undefined,
            });
        },
    },
});
