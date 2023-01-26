import assert from 'assert';

function transpose(matrix: number[][]): number[][] {
    const N = matrix.length;
    const M = matrix[0].length;
    const result: number[][] = [];
    let row: number[] = [];
    for (let j = 0; j < M; j++) {
        for (let i = 0; i < N; i++) {
            row.push(matrix[i][j]);
            if (row.length === N) {
                result.push(row);
                row = [];
            }
        }
    }
    return result;
}

function _transpose(matrix: number[][]): number[][] {}

//TODO