const axios = [
    // layer 1
    [-1, 1, 1],
    [0, 1, 1],
    [1, 1, 1],
    [-1, 1, 0],
    [0, 1, 0],
    [1, 1, 0],
    [-1, 1, -1],
    [0, 1, -1],
    [1, 1, -1],
    // layer 2
    [-1, 0, 1],
    [0, 0, 1],
    [1, 0, 1],
    [-1, 0, 0],
    [0, 0, 0],
    [1, 0, 0],
    [-1, 0, -1],
    [0, 0, -1],
    [1, 0, -1],
    // layer 3
    [-1, -1, 1],
    [0, -1, 1],
    [1, -1, 1],
    [-1, -1, 0],
    [0, -1, 0],
    [1, -1, 0],
    [-1, -1, -1],
    [0, -1, -1],
    [1, -1, -1],
];

export default class Cube {
    constructor() {
        this.cubeArr = new Array(27);
        for (let i = 0; i < 27; i++) {
            this.cubeArr[i] = {
                axios: axios[i],
            };
        }
    }
}
