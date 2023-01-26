import assert from 'assert';

function findJudge(n: number, trust: number[][]): number {
    const trustCount: number[] = Array(n + 1).fill(0);
    for (const t of trust) {
        trustCount[t[1]]++;
    }
    let candidate: number | undefined = undefined;
    for (let i = 1; i <= n; i++) {
        if (trustCount[i] === n - 1) {
            if (candidate === undefined) candidate = i;
            else return -1;
        }
    }
    if (candidate === undefined) return -1;
    for (const t of trust) {
        if (t[0] === candidate) return -1;
    }
    return candidate;
}
