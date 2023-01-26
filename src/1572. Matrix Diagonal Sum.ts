import assert from "assert";

function diagonalSum(mat: number[][]): number {
    let result = 0;
    for (let i = 0; i < mat.length; i++) {
        result += mat[i][i] + mat[i][mat.length - 1 - i];
    }
    if ((mat.length & 1) === 1) {
        const mid = (mat.length - 1) / 2;
        result -= mat[mid][mid];
    }
    return result;
}


//TODO