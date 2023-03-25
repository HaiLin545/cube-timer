import { Account } from "../../api/index";
import { getFullUrl } from "../../api/request";

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
        },
        onUpdate() {
            const updateList = [app.user.avatar, app.user.nickName];
            wx.showLoading({
                title: "保存中",
            });
            if (this.data.avatarUrl != app.user.avatar) {
                updateList[0] = Account.updateAvatar(this.data.avatarUrl);
            }
            if (this.data.nickName != app.user.nickName && this.data.nickName.trim() != "") {
                updateList[1] = Account.updateName(this.data.nickName);
            }
            Promise.all(updateList).then((res) => {
                console.log(res);
                app.user.avatar = res[0].data ? getFullUrl(res[0].data): res[0];
                app.user.nickName = res[1].data ? res[1].data : res[1];
                this.setData({
                    avatarUrl: app.user.avatar,
                    nickName: app.user.nickName,
                });
                wx.hideLoading();
                wx.navigateBack();
            });
        },
    },
});
