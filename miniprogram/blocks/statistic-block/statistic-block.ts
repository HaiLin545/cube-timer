const app = getApp<IAppOption>();

import * as echarts from "../../components/ec-canvas/echarts.js";

const option = {
    tooltip: {
        trigger: "axis",
    },
    legend: {
        data: ["所有成绩", "平均成绩", "最好成绩", "Ao5"],
        padding: [20, 5]
    },
    grid: {
        containLabel: true,
    },
    toolbox: {
        feature: {
            saveAsImage: {},
        },
    },
    xAxis: {
        type: "value",
        offset: 20,
        minInterval: 1,
        min: 1,
        axisTick: {
            show: false, //不显示坐标轴刻度线
        },
        axisLine: {
            show: false, //不显示坐标轴线
        },
        splitLine: {
            show: false, //不显示网格线
        },
    },
    yAxis: {
        type: "value",
        position: "right",
        offset: 10,
        axisTick: {
            show: false, //不显示坐标轴刻度线
        },
        axisLine: {
            show: false, //不显示坐标轴线
        },
    },
    series: [
        {
            name: "score",
            type: "line",
            data: [],
        },
    ],
};

function caculate(records: Array<IRecord>) {
    let notDNF = records.filter((rec) => !rec.isDNF);
    const len = notDNF.length;
    let score = notDNF.map((rec, idx) => {
        const s = Number((rec.isAdd2 ? rec.time / 1000 + 2 : rec.time / 1000).toFixed(2));
        return [len - idx, s];
    }).reverse();
    const avg_score = [];
    const best_score = [];
    const Ao5 = [];
    let sum = 0.0;
    let min_s = Infinity;
    for (let i = 0; i < len; i++) {
        const idx = score[i][0];
        const s = score[i][1];
        sum += s;
        avg_score.push([idx, Number((sum / (i + 1)).toFixed(2))]);
        if (s < min_s) {
            best_score.push([idx, Number(s.toFixed(2))]);
            min_s = s;
        }
        if (i >= 4) {
            Ao5.push([idx, getAo5(score.slice(i - 4, i + 1))]);
        }
    }
    const datas = {
        所有成绩: score,
        平均成绩: avg_score,
        最好成绩: best_score,
        Ao5: Ao5,
    };
    option.series = Object.keys(datas).map((key) => {
        return {
            name: key,
            type: "line",
            smooth: true,
            data: datas[key],
            symbolSize: 2,
        };
    });
}

function getAo5(arr) {
    if (arr.length != 5) {
        console.error("Ao5 wrong length");
        return 0;
    }
    let min_s = Infinity;
    let max_s = -Infinity;
    let sum = 0;
    for (let i = 0; i < 5; i++) {
        let s = arr[i][1];
        if (s > max_s) {
            max_s = s;
        }
        if (s < min_s) {
            min_s = s;
        }
        sum += s;
    }
    return Number(((sum - min_s - max_s) / 3).toFixed(2));
}

Component({
    properties: {
        records: {
            type: Array,
            value: [],
        },
    },
    data: {
        chart: null,
        ec: {
            lazyLoad: true,
        },
    },
    observers: {
        records: function (_) {
            if (this.echart) {
                this.draw();
            }
        },
    },
    lifetimes: {
        attached() {
            this.echart = this.selectComponent("#echarts");
            this.draw();
        },
    },
    methods: {
        draw() {
            caculate(this.properties.records);
            this.data.chart ? this.updateChart() : this.initChart();
        },
        initChart() {
            const chart = this.echart.init((canvas: any, width: number, height: number, dpr: number) => {
                const chart = echarts.init(canvas, null, {
                    width: width,
                    height: height,
                    devicePixelRatio: dpr, // 像素
                });
                canvas.setChart(chart);
                chart.setOption(option);
                return chart;
            });
            this.setData({
                chart: chart,
            });
        },
        updateChart() {
            this.data.chart.setOption(option);
        },
    },
});
