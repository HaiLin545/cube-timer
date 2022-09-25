//@ts-ignore
const app = getApp<IAppOption>();

Component({
    properties: {
        records: Array,
    },
    data: {
        showRecordDetail: true,
    },
    methods: {
        onClickRecordItem(e) {
            this.triggerEvent("showRecordPopper", { record: e.currentTarget.dataset.record });
        },
    },
    lifetimes: {},
});
