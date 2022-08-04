export const formatTime = (date: Date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return [month, day].map(formatNumber).join("/");
};

const formatNumber = (n: number) => {
    const s = n.toString();
    return s[1] ? s : "0" + s;
};
