import { Account } from "../../api/index";

//@ts-ignore
const app = getApp<IAppOption>();

Page({
    data: {
        isLogin: app.user.isLogin,
        statusBarHeight: app.systemInfo.statusBarHeight,
        navBarHeight: app.menuButtonInfo.bottom + app.menuButtonInfo.top - 2 * app.systemInfo.statusBarHeight,
        avatarPath: app.user.avatar,
        nickName: app.user.nickName,
        entryList: [
            { icon: "icon-cached", title: "数据云同步", link: "/" },
            { icon: "icon-paint_outlined", title: "主题配色", link: "/" },
            { icon: "icon-palette-line", title: "魔方配色", link: "/" },
            { icon: "icon-settings-4-line", title: "设置", link: "/" },
            { icon: "icon-helpoutline", title: "关于与反馈", link: "/" },
        ],
    },
    onShow() {
        this.setData({
            isLogin: app.user.isLogin,
            avatarPath: app.user.avatar,
            nickName: app.user.nickName,
        }); 
    },
    handleTapBack() {
        wx.navigateBack();
    },
    getOpenId() {
        wx.login({
            success: (res) => {
                console.log("get login code ok");
                Account.getOpenId(app.api.appid, app.api.secret, res.code)
                    .then((res) => {
                        app.user.isLogin = true;
                        app.user.openId = res.data.openid;
                        app.user.sessionKey = res.data.session_key;
                        this.setData({
                            isLogin: true,
                        });
                        console.log(app.user);
                        wx.hideLoading();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            },
            fail: (err) => {
                console.log(err);
            },
        });
    },
    handleTapLoginBtn() {
        wx.getUserProfile({
            lang: "zh_CN",
            desc: "用于个人信息完善",
            success: (res) => {
                wx.showLoading({
                    title: "登录中",
                });
                this.getOpenId();
                this.setData({
                    avatarPath: res.userInfo.avatarUrl,
                    nickName: res.userInfo.nickName,
                });
                app.user.avatar = res.userInfo.avatarUrl;
                app.user.nickName = res.userInfo.nickName;
            },
            fail: (err) => {
                console.log(err);
            },
        });
    },
    onUpdateInfo() {
        wx.navigateTo({
            url: "/pages/update-profile/update-profile",
        });
    },
    handleTapEntry(e: WechatMiniprogram.TouchEvent) {
        const index = e.currentTarget.dataset.index;
        const entry = this.data.entryList[index];
        console.log(entry.title);
        switch (entry.title) {
            default:
                break;
        }
    },
    onLoad() {},
});
