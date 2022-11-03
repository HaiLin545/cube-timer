import { formatTime, formatDay } from "../../../utils/util";

Component({
    properties: {
        record: {
            type: Object,
            value: {
                time: 0,
            },
            observer(newVal) {
                const date = new Date(newVal.date);
                this.setData({
                    dateDay: formatDay(date),
                    dateTime: formatTime(date),
                });
            },
        },
    },
    data: {
        dateDay: "",
        dateTime: "",
        isShowCube: false,
    },
    methods: {
        onClickWrapper() {
            this.triggerEvent("closePopper");
        },
        onClickPopper() {},
        taggleShowCube() {
            this.setData({
                isShowCube: !this.data.isShowCube,
            });
        },
        onClickIcon(e) {
            this.triggerEvent("updateRecordItem", { id: e.currentTarget.dataset.id, opt: e.currentTarget.dataset.opt });
        },
    },
});
