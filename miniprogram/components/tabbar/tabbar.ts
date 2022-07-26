Component({
    properties: {
        tabindex: Number,
    },
    data: {
        selected: 0,
        color: "#9C9C9C",
        selectedColor: "#FFFFF",
        iconSize: "50rpx",
        tabs: [
            {
                icon: "icon-timer-line",
            },
            {
                icon: "icon-list-check",
            },
            {
                icon: "icon-line-chart-line",
            },
        ],
    },
    methods: {
        handleClickTab(e) {
            console.log("点击tabbar图标", e.currentTarget.dataset.index);
            if (e.currentTarget.dataset.index !== this.data.tabindex) {
                this.triggerEvent("onClickTab", e.currentTarget.dataset);
            }
        },
    },
});
