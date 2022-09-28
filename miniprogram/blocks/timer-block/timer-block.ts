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
        timeLeft: 15,
        timer: 0,
        isTiming: false,
        disruption: "",
    },
    lifetimes: {
        attached() {
            this.setData({
                disruption: this.generateDisruption(),
            });
        },
    },
    observers: {},
    methods: {
        handleTap() {
            console.log("Tap the timer");
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
                timeLeft: 15,
                timer: setInterval(() => {
                    if (this.data.timeLeft > 0) {
                        this.setData({
                            timeLeft: this.data.timeLeft - 1,
                        });
                    } else {
                        this.setData({
                            timeLeft: 0,
                        });
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
            const record_date = new Date();
            this.triggerEvent("onAddRecord", {
                record: {
                    date: record_date.toString(),
                    score: this.data.time,
                    day: formatTimeTiny(record_date),
                    id: record_date.valueOf(),
                    disruption: this.data.disruption,
                    remark: "",
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
