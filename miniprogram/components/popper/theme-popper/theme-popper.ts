Component({
    properties: {
        onConfirm: {
            type: Function,
            value: () => {},
        },
    },
    data: {
        themeList: [
            "#1ABC9C",
            "#2ECC71",
            "#3498DB",
            "#9B59B6",
            "#16A085",
            "#27AE60",
            "#2980B9",
            "#F1C40F",
            "#E67E22",
            "#E74C3C",
            "#CDE1FD",
            "#F39C12",
            "#D35400",
            "#BDC3C7",
        ],
    },
    methods: {
        onClickWrapper() {
            this.triggerEvent("closePopper");
        },
        onClickPopper() {},
        onCancel() {
            this.triggerEvent("closePopper");
        },
        onOk() {
            this.triggerEvent("closePopper");
        },
        onSelectBgColor(e: WechatMiniprogram.TouchEvent) {
            this.triggerEvent("alterTheme", { color: e.currentTarget.dataset.color });
        },
    },
});
