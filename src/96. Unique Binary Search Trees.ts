import assert from 'assert';

function numTrees(n: number): number {
    const cache: number[] = [1, 1];
    while (cache.length <= n) {
        let count = cache[cache.length - 1];
        for (let rootNode = 1; rootNode < cache.length; rootNode++) {
            count += cache[rootNode - 1] * cache[cache.length - rootNode];
        }
        cache[cache.length] = count;
    }
    return cache[n];
}

function _numTrees(n: number): number {
    //TODO
    return 1;
}

function test() {
    let n: number = 0;
    try {
        for (n = 1; n <= 19; n++) {
            numTrees(n);
        }
    } catch (e) {
        console.log(n);
        if (e instanceof assert.AssertionError) {
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
