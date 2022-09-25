export const formatTimeTiny = (date: Date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return [month, day].map(formatNumber).join("/");
};

export const formatDay = (date: Date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    return [year, month, day].join("/");
};

export const formatTime = (date: Date) => {
    const hours = date.getHours();
    const mins = date.getMinutes();
    const seconds = date.getSeconds();

    return [hours, mins, seconds].join(":");
};

const formatNumber = (n: number) => {
    const s = n.toString();
    return s[1] ? s : "0" + s;
};
