import { formatTime } from "../../utils/util";

const app = getApp<IAppOption>();

const AllStep = ["U", "U'", "U2", "D", "D'", "D2", "L", "L'", "L2", "R", "R'", "R2", "F", "F'", "F2", "B", "B'", "B2"];
const disruptionLength = 21;

Component({
    properties: {},
    data: {
        time: "0.00",
        timeLeft: "0",
        timeRight: "00",
        isTiming: false,
        fixedBit: 2,
        timer: 0,
        disruption: "",
    },
    lifetimes: {
        attached() {
            this.setData({
                disruption: this.generateDisruption(),
            });
        },
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
        generateDisruption(len?: number): string {
            const targetLen = len ?? disruptionLength;
            let newDisruption: String[] = [];
            let currentLen = 0;
            let lastIdx: number = -5;
            let lastIdx2: number = -5;
            while (currentLen < targetLen) {
                const newIdx = Math.round(Math.random() * (AllStep.length - 1));
                const p = Math.floor(newIdx / 3);
                const q = Math.floor(lastIdx / 3);
                const h = Math.floor(lastIdx2 / 3);
                // U2 U'这种连在一起的情况
                if (p === q) continue;

                // U2 D U'这种间隔连在一起的情况
                if ((p % 2 === 0 && p === q - 1) || (p % 2 === 1 && p === q + 1)) {
                    if (p === h) continue;
                }
                newDisruption.push(AllStep[newIdx]);
                lastIdx2 = lastIdx;
                lastIdx = newIdx;
                currentLen++;
            }
            console.log("generate new disruption", newDisruption);
            return newDisruption.join(" ");
        },
        onRefreshDisruption() {
            this.setData({
                disruption: this.generateDisruption(),
            });
        },
    },
});
