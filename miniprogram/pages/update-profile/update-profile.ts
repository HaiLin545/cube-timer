const app = getApp<IAppOption>();
Component({
    data: {
        nickName: "",
        avatarUrl: "",
    },
    lifetimes: {
        attached() {
            this.setData({
                nickName: app.user.nickName,
                avatarUrl: app.user.avatar,
            });
        },
    },
    methods: {
        onChooseAvatar(e: WechatMiniprogram.TouchEvent) {
            const { avatarUrl } = e.detail;
            this.setData({
                avatarUrl,
            });
            app.user.avatar = avatarUrl;
        },
        onUpdate() {
            console.log(this.data);
            app.user.avatar = this.data.avatarUrl;
            app.user.nickName = this.data.nickName;
            wx.navigateBack();
        },
    },
});
