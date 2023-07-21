const theme: { [propName: string]: string } = {
    u: "#FFFFFF",
    f: "#00B578",
    r: "#FA5151",
    l: "#FF8F1F",
    b: "#3662EC",
    d: "#fefe3f",
};

interface IFace {
    id: number;
    color: string;
}

type RotateTime = 1 | 2 | 3;
type CubeFace = "u" | "f" | "r" | "d" | "l" | "b";

function initFace(color: string): IFace[] {
    let face: IFace[] = new Array(9).fill({});
    for (let i = 0; i < 9; i++) {
        face[i] = { id: i, color };
    }
    return face;
}

const [_u, _f, _r, _l, _b, _d] = Object.keys(theme).map((key) => initFace(theme[key]));
const closeWiseArr = [
    [0, 6, 8, 2],
    [1, 3, 7, 5],
];

Component({
    data: {
        msg: "this is cube",
        u: _u,
        f: _f,
        r: _r,
        l: _l,
        b: _b,
        d: _d,
    },
    properties: {
        disruption: {
            type: String,
            value: "",
            observer: function (newVal) {
                const originState = Object.keys(theme).map((key) => initFace(theme[key]));
                this.setData({
                    u: originState[0],
                    f: originState[1],
                    r: originState[2],
                    l: originState[3],
                    b: originState[4],
                    d: originState[5],
                });
                this.disruptWithFormula(newVal.split(" "));
            },
        },
    },
    lifetimes: {
        attached() {},
    },
    methods: {
        rotateY(row: number, times: RotateTime, state: IFace[][]): IFace[][] {
            let [i, j, k] = [0, 1, 2].map((item) => item + (row - 1) * 3);
            let [u, f, r, l, b, d] = state;
            let tmp = [f[i].color, f[j].color, f[k].color];
            switch (times) {
                case 1:
                    [f[i].color, f[j].color, f[k].color] = [r[i].color, r[j].color, r[k].color];
                    [r[i].color, r[j].color, r[k].color] = [b[i].color, b[j].color, b[k].color];
                    [b[i].color, b[j].color, b[k].color] = [l[i].color, l[j].color, l[k].color];
                    [l[i].color, l[j].color, l[k].color] = tmp;
                    break;
                case 2:
                    [f[i].color, f[j].color, f[k].color, b[i].color, b[j].color, b[k].color] = [
                        b[i].color,
                        b[j].color,
                        b[k].color,
                        f[i].color,
                        f[j].color,
                        f[k].color,
                    ];
                    [r[i].color, r[j].color, r[k].color, l[i].color, l[j].color, l[k].color] = [
                        l[i].color,
                        l[j].color,
                        l[k].color,
                        r[i].color,
                        r[j].color,
                        r[k].color,
                    ];
                    break;
                case 3:
                    [f[i].color, f[j].color, f[k].color] = [l[i].color, l[j].color, l[k].color];
                    [l[i].color, l[j].color, l[k].color] = [b[i].color, b[j].color, b[k].color];
                    [b[i].color, b[j].color, b[k].color] = [r[i].color, r[j].color, r[k].color];
                    [r[i].color, r[j].color, r[k].color] = tmp;
                    break;
            }
            return [u, f, r, l, b, d];
        },
        rotateX(column: number, times: RotateTime, state: IFace[][]): IFace[][] {
            let [i, j, k] = [column - 1, column + 2, column + 5];
            let [i_, j_, k_] = [2 - i, 8 - j, 14 - k];
            let [u, f, r, l, b, d] = state;
            let tmp = [f[i].color, f[j].color, f[k].color];
            switch (times) {
                case 1:
                    [f[i].color, f[j].color, f[k].color] = [d[i].color, d[j].color, d[k].color];
                    [d[i].color, d[j].color, d[k].color] = [b[k_].color, b[j_].color, b[i_].color];
                    [b[k_].color, b[j_].color, b[i_].color] = [u[i].color, u[j].color, u[k].color];
                    [u[i].color, u[j].color, u[k].color] = tmp;
                    break;
                case 2:
                    [f[i].color, f[j].color, f[k].color, b[k_].color, b[j_].color, b[i_].color] = [
                        b[k_].color,
                        b[j_].color,
                        b[i_].color,
                        f[i].color,
                        f[j].color,
                        f[k].color,
                    ];
                    [d[i].color, d[j].color, d[k].color, u[i].color, u[j].color, u[k].color] = [
                        u[i].color,
                        u[j].color,
                        u[k].color,
                        d[i].color,
                        d[j].color,
                        d[k].color,
                    ];
                    break;
                case 3:
                    [f[i].color, f[j].color, f[k].color] = [u[i].color, u[j].color, u[k].color];
                    [u[i].color, u[j].color, u[k].color] = [b[k_].color, b[j_].color, b[i_].color];
                    [b[k_].color, b[j_].color, b[i_].color] = [d[i].color, d[j].color, d[k].color];
                    [d[i].color, d[j].color, d[k].color] = tmp;
                    break;
            }
            return [u, f, r, l, b, d];
        },
        rotateZ(axios: number, times: RotateTime, state: IFace[][]): IFace[][] {
            let [u_i, u_j, u_k] = [0, 1, 2].map((item) => item + (3 - axios) * 3);
            let [d_i, d_j, d_k] = [0, 1, 2].map((item) => item + (axios - 1) * 3);
            let [r_i, r_j, r_k] = [axios - 1, axios + 2, axios + 5];
            let [l_i, l_j, l_k] = [2 - r_i, 8 - r_j, 14 - r_k];
            let [u, f, r, l, b, d] = state;
            let tmp = [u[u_i].color, u[u_j].color, u[u_k].color];
            switch (times) {
                case 1:
                    [u[u_i].color, u[u_j].color, u[u_k].color] = [l[l_k].color, l[l_j].color, l[l_i].color];
                    [l[l_i].color, l[l_j].color, l[l_k].color] = [d[d_i].color, d[d_j].color, d[d_k].color];
                    [d[d_i].color, d[d_j].color, d[d_k].color] = [r[r_k].color, r[r_j].color, r[r_i].color];
                    [r[r_i].color, r[r_j].color, r[r_k].color] = tmp;
                    break;
                case 2:
                    [u[u_i].color, u[u_j].color, u[u_k].color, d[d_i].color, d[d_j].color, d[d_k].color] = [
                        d[d_k].color,
                        d[d_j].color,
                        d[d_i].color,
                        u[u_k].color,
                        u[u_j].color,
                        u[u_i].color,
                    ];
                    [r[r_i].color, r[r_j].color, r[r_k].color, l[l_i].color, l[l_j].color, l[l_k].color] = [
                        l[l_k].color,
                        l[l_j].color,
                        l[l_i].color,
                        r[r_k].color,
                        r[r_j].color,
                        r[r_i].color,
                    ];
                    break;
                case 3:
                    [u[u_i].color, u[u_j].color, u[u_k].color] = [r[r_i].color, r[r_j].color, r[r_k].color];
                    [r[r_i].color, r[r_j].color, r[r_k].color] = [d[d_k].color, d[d_j].color, d[d_i].color];
                    [d[d_i].color, d[d_j].color, d[d_k].color] = [l[l_i].color, l[l_j].color, l[l_k].color];
                    [l[l_k].color, l[l_j].color, l[l_i].color] = tmp;
                    break;
            }
            return [u, f, r, l, b, d];
        },
        rotateFace(face: CubeFace, times: RotateTime): IFace[] {
            let fac = this.data[face];
            let tmp = null;
            switch (times) {
                case 1:
                    for (const cw of closeWiseArr) {
                        tmp = fac[cw[0]].color;
                        for (let i = 0; i < cw.length - 1; i++) {
                            fac[cw[i]].color = fac[cw[i + 1]].color;
                        }
                        fac[cw[cw.length - 1]].color = tmp;
                    }
                    break;
                case 2:
                    [fac[0].color, fac[8].color] = [fac[8].color, fac[0].color];
                    [fac[2].color, fac[6].color] = [fac[6].color, fac[2].color];
                    [fac[1].color, fac[7].color] = [fac[7].color, fac[1].color];
                    [fac[3].color, fac[5].color] = [fac[5].color, fac[3].color];
                    break;
                case 3:
                    for (const cw of closeWiseArr) {
                        tmp = fac[cw[cw.length - 1]].color;
                        for (let i = cw.length - 1; i > 0; i--) {
                            fac[cw[i]].color = fac[cw[i - 1]].color;
                        }
                        fac[cw[0]].color = tmp;
                    }
                    break;
            }
            return fac;
        },
        disruptWithFormula(formula: string[]) {
            let state: IFace[][] = [this.data.u, this.data.f, this.data.r, this.data.l, this.data.b, this.data.d];
            for (let i = 0; i < formula.length; i++) {
                switch (formula[i]) {
                    case "U":
                        state = this.rotateY(1, 1, state);
                        state[0] = this.rotateFace("u", 1);
                        break;
                    case "U2":
                        state = this.rotateY(1, 2, state);
                        state[0] = this.rotateFace("u", 2);
                        break;
                    case "U'":
                        state = this.rotateY(1, 3, state);
                        state[0] = this.rotateFace("u", 3);
                        break;
                    case "D":
                        state = this.rotateY(3, 3, state);
                        state[5] = this.rotateFace("d", 1);
                        break;
                    case "D2":
                        state = this.rotateY(3, 2, state);
                        state[5] = this.rotateFace("d", 2);
                        break;
                    case "D'":
                        state = this.rotateY(3, 1, state);
                        state[5] = this.rotateFace("d", 3);
                        break;
                    case "R":
                        state = this.rotateX(3, 1, state);
                        state[2] = this.rotateFace("r", 1);
                        break;
                    case "R2":
                        state = this.rotateX(3, 2, state);
                        state[2] = this.rotateFace("r", 2);
                        break;
                    case "R'":
                        state = this.rotateX(3, 3, state);
                        state[2] = this.rotateFace("r", 3);
                        break;
                    case "L":
                        state = this.rotateX(1, 3, state);
                        state[3] = this.rotateFace("l", 1);
                        break;
                    case "L2":
                        state = this.rotateX(1, 2, state);
                        state[3] = this.rotateFace("l", 2);
                        break;
                    case "L'":
                        state = this.rotateX(1, 1, state);
                        state[3] = this.rotateFace("l", 3);
                        break;
                    case "F":
                        state = this.rotateZ(1, 1, state);
                        state[1] = this.rotateFace("f", 1);
                        break;
                    case "F2":
                        state = this.rotateZ(1, 2, state);
                        state[1] = this.rotateFace("f", 2);
                        break;
                    case "F'":
                        state = this.rotateZ(1, 3, state);
                        state[1] = this.rotateFace("f", 3);
                        break;
                    case "B":
                        state = this.rotateZ(3, 3, state);
                        state[4] = this.rotateFace("b", 1);
                        break;
                    case "B2":
                        state = this.rotateZ(3, 2, state);
                        state[4] = this.rotateFace("b", 2);
                        break;
                    case "B'":
                        state = this.rotateZ(3, 1, state);
                        state[4] = this.rotateFace("b", 3);
                        break;
                    default:
                        break;
                }
            }
            this.setData({
                u: state[0],
                f: state[1],
                r: state[2],
                l: state[3],
                b: state[4],
                d: state[5],
            });
        },
    },
});
