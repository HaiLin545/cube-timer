const app = getApp<IAppOption>();

Component({
    properties: {},
    data: {
        statusBarHeight: app.systemInfo.statusBarHeight,
    },
    methods: {},
});
