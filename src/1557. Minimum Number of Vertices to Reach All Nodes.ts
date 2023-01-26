import assert from 'assert';

function findSmallestSetOfVertices(n: number, edges: number[][]): number[] {
    const hasIncoming: null[] = [];
    for (const edge of edges) hasIncoming[edge[1]] = null;
    const result: number[] = [];
    for (let i = 0; i < n; i++) {
        if (hasIncoming[i] === undefined) result.push(i);
    }
    return result;
}

function _findSmallestSetOfVertices(n: number, edges: number[][]): number[] {
}

//TODO
