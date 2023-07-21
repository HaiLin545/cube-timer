import { request, baseUrl } from "./request";

const app = getApp<IAppOption>();

export function getOpenId(js_code: string) {
    return request({
        method: "GET",
        url: "/getopenid",
        data: {
            js_code,
        },
    });
}

export function login(openid: string) {
    return request({
        method: "GET",
        url: "/login",
        data: {
            openid,
        },
    });
}

export function updateAvatar(avatar: string) {
    console.log(avatar);
    return new Promise((resolve, reject) => {
        wx.uploadFile({
            url: baseUrl + "/updateAvatar",
            filePath: avatar,
            name: "avatar",
            formData: {
                openid: app.user.openId,
            },
            header: {
                "content-type": "multipart/form-data", //注意
            },
            success: (res) => {
                console.log("upload user info success", res);
                resolve(res);
            },
            fail: (err) => {
                console.log(err);
                reject(err);
            },
        });
    });
}

export function updateName(nickName: string) {
    console.log("update name", nickName)
    return request({
        method: "POST",
        url: "/updateName",
        data: {
            openid: app.user.openId,
            nickName: nickName,
        },
    });
}
