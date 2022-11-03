Component({
    properties: {
        onConfirm: Function,
        title: String,
        okText: {
            type: String,
            value: "确定",
        },
        cancelText: {
            type: String,
            value: "取消",
        },
    },
    data: {},
    methods: {
        onClickWrapper() {
            this.triggerEvent("closePopper");
        },
        onClickPopper() {},
        onCancel() {
            this.triggerEvent("closePopper");
        },
        onOk() {
            this.data.onConfirm();
            this.triggerEvent("closePopper");
        },
    },
});
