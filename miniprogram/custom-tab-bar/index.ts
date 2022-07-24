Component({
    data: {
        selected: 0,
        color: "blue",
        selectedColor: "red",
        list: [
            {
                pagePath: "/pages/home/home",
                icon: "icon-AddCircle",
                color: "black",
                selectedColor: "blue",
                text: "Timer",
            },
            {
                pagePath: "/pages/logs/logs",
                icon: "icon-Add",
                color: "black",
                selectedColor: "blue",
                text: "logs",
            },
        ],
    },
    attached() {},
    methods: {
        switchTab(e) {
            const data = e.currentTarget.dataset;
            wx.switchTab({ url: data.path });
        },
    },
});
