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
            if (e.currentTarget.dataset.index !== this.data.tabindex) {
                this.triggerEvent("onClickTab", e.currentTarget.dataset);
            }
        },
    },
});
