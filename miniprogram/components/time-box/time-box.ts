const fixedBit = 2;

Component({
    properties: {
        time: {
            type: Number,
            value: 0,
            observer(newVal) {
                let newRight = this.getRightPart(newVal % 1000);
                let newLeft = this.getLeftPart(newVal / 1000);
                // console.log(newLeft, newRight);
                this.setData({
                    rightPart: newRight,
                    leftPart: newLeft,
                });
            },
        },
        isDNF: {
            type: Boolean,
            value: false,
        },
        size: {
            type: Number,
            value: 32,
        },
    },
    data: {
        leftPart: "0",
        rightPart: ".00",
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
