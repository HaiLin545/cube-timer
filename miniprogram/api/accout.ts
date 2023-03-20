import { request } from "./request";

export function getOpenId(appid: string, secret: string, js_code: string) {
    return request({
        method: "GET",
        url: "https://api.weixin.qq.com/sns/jscode2session",
        data: {
            appid,
            secret,
            js_code,
            grant_type: "authorization_code",
        },
    });
}
