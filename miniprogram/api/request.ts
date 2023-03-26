const app = getApp<IAppOption>();


export const baseUrl = 'https://hailin545.cn:5454';

export function request(params: { method: "GET" | "POST" | "DELETE" | "PUT"; url: string; data: object }) {
    console.log(params.data)
    return new Promise((resolve, reject) => {
        wx.request({
            method: params.method,
            url: params.url.startsWith("http") ? params.url : baseUrl + params.url,
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

export const getFullUrl = (avatar: string)=>{
    return baseUrl + "/avatar/" + avatar;
}

