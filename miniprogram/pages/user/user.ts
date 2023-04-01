import { Account, Sync } from "../../api/index";
import { getFullUrl } from "../../api/request";
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
            { icon: "icon-cached", title: "同步数据", link: "/" },
            // { icon: "icon-paint_outlined", title: "主题配色", link: "/" },
            // { icon: "icon-palette-line", title: "魔方配色", link: "/" },
            // { icon: "icon-settings-4-line", title: "设置", link: "/" },
            // { icon: "icon-helpoutline", title: "关于与反馈", link: "/" },
        ],
        showConfirmPopper: false,
        confirmPopperIsCancel: false,
        confirmPopperTitle: "请先登录",
        showSyncPopper: false,
        confirmFunc: () => {},
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
    serverLogin(params: { openid: string }) {
        const { openid } = params;
        app.user.openId = openid;
        Account.login(openid)
            .then((login_res) => {
                const { avatar, nickName } = login_res.data;
                app.user.isLogin = true;
                app.user.avatar = getFullUrl(avatar);
                app.user.nickName = nickName;
                this.setData({
                    avatarPath: app.user.avatar,
                    nickName: app.user.nickName,
                    isLogin: true,
                });
                app.storeLoginState();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                wx.hideLoading();
            });
    },
    getOpenId() {
        wx.login({
            success: (res) => {
                console.log("get login code ok");
                Account.getOpenId(res.code)
                    .then((res) => {
                        this.serverLogin(res.data);
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
            case "同步数据":
                this.handleTapSync();
                break;
            default:
                break;
        }
    },
    handleTapSync() {
        if (this.data.isLogin) {
            this.setData({
                showSyncPopper: true,
            });
        } else {
            this.setData({
                showConfirmPopper: true,
            });
        }
    },
    closeConfirmPopper() {
        this.setData({
            showConfirmPopper: false,
        });
    },
    hideSyncPopper() {
        this.setData({
            showSyncPopper: false,
        });
    },
    onSyncUp() {
        console.log("on sync up");
        this.setData({
            showConfirmPopper: true,
            showSyncPopper: false,
            confirmPopperIsCancel: true,
            confirmPopperTitle: "确定要将本地数据上传到服务器吗? (这将覆盖原有的数据)",
            confirmFunc: () => {
                wx.showLoading({
                    title: "同步中",
                });
                Sync.syncUp()
                    .then((res) => {
                        console.log(res);
                        wx.hideLoading();
                        wx.showToast({
                            icon: "success",
                            title: "同步成功",
                        });
                    })
                    .catch((err) => {
                        wx.showToast({
                            icon: "fail",
                            title: err,
                        });
                    });
            },
        });
    },
    onSyncDown() {
        console.log("on sync down");
        this.setData({
            showConfirmPopper: true,
            showSyncPopper: false,
            confirmPopperIsCancel: true,
            confirmPopperTitle: "确定要将服务器的数据同步到本地吗? (这将与本地数据合并)",
            confirmFunc: () => {
                wx.showLoading({
                    title: "同步中",
                });
                Sync.syncDown()
                    .then((res) => {
                        console.log(res);
                        app.handleSyncDown(res.data);
                        wx.hideLoading();
                        wx.showToast({
                            icon: "success",
                            title: "同步成功",
                        });
                    })
                    .catch((err) => {
                        wx.showToast({
                            icon: "fail",
                            title: err,
                        });
                    });
            },
        });
    },
});
