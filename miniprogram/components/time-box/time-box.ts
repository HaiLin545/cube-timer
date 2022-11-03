const fixedBit = 2;

Component({
    properties: {
        time: {
            type: Number,
            value: 0,
            observer(newVal) {
                if (this.data.isAdd2) {
                    this.setData({
                        realTime: newVal + 2000,
                    });
                } else {
                    this.setData({
                        realTime: newVal,
                    });
                }
            },
        },
        isDNF: {
            type: Boolean,
            value: false,
        },
        isAdd2: {
            type: Boolean,
            value: false,
            observer(newVal) {
                if (newVal) {
                    this.setData({
                        realTime: this.data.time + 2000,
                    });
                } else {
                    this.setData({
                        realTime: this.data.time,
                    });
                }
            },
        },
        size: {
            type: Number,
            value: 32,
        },
    },
    data: {
        leftPart: "0",
        rightPart: ".00",
        realTime: 0,
    },
    observers: {
        realTime: function (newVal) {
            let newRight = this.getRightPart(newVal % 1000);
            let newLeft = this.getLeftPart(newVal / 1000);
            this.setData({
                rightPart: newRight,
                leftPart: newLeft,
            });
        },
    },
    methods: {
        getRightPart(t: number) {
            if (t >= 100) return `.${(t /= 10)}`;
            else if (t >= 10) return `.${t}`;
            else return `.00`;
        },
        getLeftPart(t: number) {
            return `${Math.floor(t)}`;
        },
    },
});
