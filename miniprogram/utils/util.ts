function msToS(ms, fixedBit = 2) {
    // @TODO: min, hour
    return (ms / 1000).toFixed(fixedBit);
}

export const getStatistic = (records) => {
    const MAX_TIME = 1e10;
    let Count = records.length, // 成绩次数
        Avg = "--", // 所有成绩平均值
        Best = MAX_TIME, // 最快成绩
        Ao5 = "--", // 近5次成绩的平均值，若超过1个DNF，则为DNF
        Ao12 = "--", // 近12次成绩的平均值，若超过2个DNF，则为DNF
        Ao50 = "--"; // 近50次成绩的平均值，若超过10次DNF，则为DNF

    let count_dnf = 0;
    let sum = 0;
    for (let i = 0; i < records.length; i++) {
        if (records[i].isDNF || !records[i].isValid) {
            count_dnf += 1;
        }
        if (records[i].isValid) {
            const time = records[i].isAdd2 ? records[i].time + 2000 : records[i].time;
            if (time < Best) {
                Best = time;
            }
            sum += time;
        }
        if (i == 4) {
            Ao5 = count_dnf < 2 ? msToS(sum / (5 - count_dnf)) : "DNF";
        }
        if (i == 11) {
            Ao12 = count_dnf < 3 ? msToS(sum / (12 - count_dnf)) : "DNF";
        }
        if (i == 49) {
            Ao50 = count_dnf < 11 ? msToS(sum / (50 - count_dnf)) : "DNF";
        }
    }
    if (Count - count_dnf > 0) {
        Avg = msToS(sum / (Count - count_dnf));
    }
    return {
        Count,
        Avg,
        Best: Best === MAX_TIME ? "--" : msToS(Best),
        Ao5,
        Ao12,
        Ao50,
    };
};

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
