import assert from 'assert';

function kthSmallest(matrix: number[][], k: number): number {
}

function _kthSmallest(matrix: number[][], k: number): number {
    let currIndexs: number[] = Array(matrix.length).fill(0);
    let count = 0;
    while (true) {
        let min = Number.POSITIVE_INFINITY;
        for (let i = 0; i < matrix.length; i++){
            min = Math.min(min, matrix[i][currIndexs[i]] ?? Number.POSITIVE_INFINITY);
        }
        for (let i = 0; i < matrix.length; i++) {
            if (matrix[i][currIndexs[i]] === min) {
                count++;
                currIndexs[i]++;
                break;
            }
        }
        if (count === k) return min;
    }
}

function __kthSmallest(matrix: number[][], k: number): number {
    return matrix.flat().sort((a, b) => a - b)[k - 1];
}

//TODO
