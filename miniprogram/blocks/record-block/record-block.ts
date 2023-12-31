//@ts-ignore
const app = getApp<IAppOption>();

Component({
    properties: {
        records: {
            type: Array,
            value: [],
        },
    },
    data: {
        showRecordDetail: true,
    },
    methods: {
        onClickRecordItem(e: WechatMiniprogram.TouchEvent) {
            this.triggerEvent("showRecordPopper", { record: e.currentTarget.dataset.record });
        },
    },
    lifetimes: {
        attached() {},
    },
});
