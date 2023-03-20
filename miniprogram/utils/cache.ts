export const setStorageAsync = async (key: string, data: any) => {
    wx.setStorage({
        key,
        data: JSON.stringify(data),
        success: () => {
            console.log("setStorageAsync success", key);
        },
        fail: () => {
            console.log("setStorageAsync fail", key);
        },
    });
};

export const setStorage = (key: string, data: any) => {
    try {
        wx.setStorageSync(key, JSON.stringify(data));
        console.log("setStorage success", key);
    } catch (err) {
        console.log("setStorage fail", key, err);
    }
};

export const getStorageAsync = (key: string) => {
    return new Promise((resolve, reject) => {
        wx.getStorage({
            key,
            success: function (res) {
                console.log("getStorageAsync success", key, JSON.parse(res.data));
                resolve(JSON.parse(res.data));
            },
            fail: function (err) {
                reject(err);
            },
        });
    });
};

export const getStorage = (key: string) => {
    try {
        const value = JSON.parse(wx.getStorageSync(key));
        console.log("getStorage success", key);
        return value;
    } catch (err) {
        console.log("getStorage fail", key, err);
    }
};

export const getRecordsStorage = async (keys: Array<string>) => {
    return Promise.all(
        keys.map((key) => {
            return new Promise((resolve, reject) => {
                getStorageAsync(key)
                    .then((res) => resolve(res))
                    .catch((err) => {
                        resolve([]);
                    });
            });
        })
    );
};

export const deleteStorageAsync = async (key: string) => {
    wx.removeStorage({
        key: key,
        success: () => {
            console.log("deleteStorage success", key);
        },
        fail: () => {
            console.log("deleteStorage fail", key, err);
        },
    });
};
