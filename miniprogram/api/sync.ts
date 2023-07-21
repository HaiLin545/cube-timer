import { request } from "./request";

const app = getApp<IAppOption>();

export function syncUp() {
    console.log({
        records: app.records,
        currentGoup: app.currentGroup,
        groups: app.groups,
    });
    return request({
        method: "POST",
        url: "/sync/up",
        data: {
            openid: app.user.openId,
            records: app.records,
            currentGroup: app.currentGroup,
            groups: app.groups,
        },
    });
}

export function syncDown() {
    return request({
        method: "GET",
        url: "/sync/down",
        data: {
            openid: app.user.openId,
        },
    });
}
