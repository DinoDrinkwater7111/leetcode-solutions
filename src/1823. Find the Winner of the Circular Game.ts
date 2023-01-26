import assert from 'assert';

function findTheWinner(n: number, k: number): number {
    
}


function _findTheWinner(n: number, k: number): number {
    const arr = Array(n)
        .fill(0)
        .map((v, i) => i + 1);

    let i = 0;
    while (arr.length > 1) {
        i = (i + k - 1) % arr.length;
        arr.splice(i, 1);
    }
    return arr[0];
}
