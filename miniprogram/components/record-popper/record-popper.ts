import { formatTime, formatDay } from "../../utils/util";

Component({
    properties: {
        record: {
            type: Object,
            value: {},
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
            this.triggerEvent("closeRecordPopper");
        },
        onClickPopper() {
            console.log("clickPopper");
        },
        taggleShowCube() {
            this.setData({
                isShowCube: !this.data.isShowCube,
            });
        },
        onClickDeleteIcon(e) {
            this.triggerEvent("deleteRecordItem", { id: e.currentTarget.dataset.id });
        },
    },
});
