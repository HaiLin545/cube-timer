import { formatTimeTiny } from "../../utils/util";
import { ITimerState } from "../../type";

const app = getApp<IAppOption>();

const AllStep = ["U", "U'", "U2", "D", "D'", "D2", "L", "L'", "L2", "R", "R'", "R2", "F", "F'", "F2", "B", "B'", "B2"];
const disruptionLength = 21;

Component({
    properties: {
        timerState: {
            type: ITimerState,
            value: ITimerState.Off,
        },
    },
    data: {
        time: 0,
        timeLeft: app.setting.inspectionTime,
        timer: 0,
        isTiming: false,
        disruption: "",
        timeOutTip: "",
    },
    lifetimes: {
        attached() {
            this.updateDisruption();
        },
    },
    observers: {},
    methods: {
        handleTap() {
            console.log("Tap the timer", this.data.timeOutTip);
            let newState = null;
            if (this.data.timerState == ITimerState.Off) {
                if (app.setting.enableInspection) {
                    this.startInspectiong();
                    newState = ITimerState.Inspecting;
                } else {
                    this.startTiming();
                    newState = ITimerState.Timing;
                }
            }
            if (this.data.timerState == ITimerState.Inspecting) {
                clearInterval(this.data.timer);
                this.startTiming();
                newState = ITimerState.Timing;
            }
            if (this.data.timerState == ITimerState.Timing) {
                this.endTiming();
                newState = ITimerState.Off;
            }
            this.triggerEvent("changeTimerState", { newState });
        },
        startInspectiong() {
            console.log("start inspecting");
            this.setData({
                timeLeft: app.setting.inspectionTime,
                timeOutTip: "",
                timer: setInterval(() => {
                    if (this.data.timeLeft > 1) {
                        this.setData({
                            timeLeft: this.data.timeLeft - 1,
                        });
                    } else if (this.data.timeLeft === 1) {
                        this.setData({
                            timeLeft: this.data.timeLeft - 1,
                            timeOutTip: "+2",
                        });
                    } else if (this.data.timeLeft > -1) {
                        this.setData({
                            timeLeft: this.data.timeLeft - 1,
                        });
                    } else if (this.data.timeLeft === -1) {
                        this.setData({
                            timeOutTip: "DNF",
                        });
                        setTimeout(() => {
                            this.triggerEvent("changeTimerState", { newState: ITimerState.Off });
                            this.addRecord();
                            clearTimeout(this.data.timer);
                        }, 200);
                    }
                }, 1000),
            });
        },
        startTiming() {
            console.log("start timing");
            clearInterval(this.data.timer);
            this.setData({
                isTiming: true,
                time: 0,
                timer: setInterval(() => {
                    this.setData({
                        time: this.data.time + 10,
                    });
                }, 10),
            });
        },
        endTiming() {
            console.log("end timing");
            clearInterval(this.data.timer);
            this.addRecord();
            this.setData({
                isTiming: false,
                disruption: this.generateDisruption(),
            });
        },
        addRecord(remark?: string) {
            const record_date = new Date();
            console.log("time out tip", this.data.timeOutTip);
            this.triggerEvent("onAddRecord", {
                record: {
                    date: record_date.toString(),
                    time: this.data.time,
                    day: formatTimeTiny(record_date),
                    id: record_date.valueOf(),
                    disruption: this.data.disruption,
                    remark: remark ?? "",
                    isDNF: this.data.timeOutTip === "DNF",
                    isAdd2: this.data.timeOutTip === "+2",
                },
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
            return newDisruption.join(" ");
        },
        updateDisruption() {
            this.setData({
                disruption: this.generateDisruption(),
                // disruption: "F2 U' R' B' U' R2 B' L F D F2 U' R2 D2 R2 U L2 D' R2 D2",
            });
        },
    },
});
