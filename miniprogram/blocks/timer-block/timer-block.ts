import { formatTime } from "../../utils/util";

const app = getApp<IAppOption>();

Component({
    properties: {},
    data: {
        time: "0.00",
        timeLeft: "0",
        timeRight: "00",
        isTiming: false,
        fixedBit: 2,
        timer: 0,
        disruption: "F2 R B2 L2 R U2 L F L2 R' D U B2 L U2 R D2 R2",
    },
    observers: {
        time: function (time) {
            let [tmpLeft, tmpRight] = time.split(".");
            this.setData({
                timeLeft: tmpLeft,
                timeRight: tmpRight,
            });
        },
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
                    let tmp = (Number(this.data.time) + 0.01).toFixed(this.data.fixedBit);
                    this.setData({
                        time: tmp,
                    });
                }, 10),
            });
        },
        endTiming() {
            console.log("end timing");
            clearInterval(this.data.timer);
            const record_date = new Date();
            this.triggerEvent("onAddRecord", {
                record: {
                    date: record_date,
                    score: this.data.time,
                    day: formatTime(record_date),
                    id: record_date.valueOf(),
                },
            });
            this.setData({
                isTiming: false,
            });
        },
    },
});
