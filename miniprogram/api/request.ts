const app = getApp<IAppOption>();

export function request(params: { method: "GET" | "POST" | "DELETE" | "PUT"; url: string; data: object }) {
    return new Promise((resolve, reject) => {
        wx.request({
            method: params.method,
            url: params.url.startsWith("http") ? params.url : app.api.baseUrl + params.url,
            data: params.data,
            success: (res) => {
                console.log(`${params.method}---${params.url} 请求成功`, res);
                resolve(res);
            },
            fail: (err) => {
                console.log(`${params.method}---${params.url} 请求失败`, err);
                reject(err);
            },
        });
    });
}
