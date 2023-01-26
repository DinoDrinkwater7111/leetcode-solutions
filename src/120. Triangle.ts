import assert from 'assert';

function minimumTotal(triangle: number[][]): number {
    let cache = triangle[0];
    for (let level = 1; level < triangle.length; level++) {
        const _cache: number[] = [];
        for (let col = 0; col < triangle[level].length; col++) {
            _cache[col] =
                triangle[level][col] +
                Math.min(cache[col - 1] ?? Number.MAX_SAFE_INTEGER, cache[col] ?? Number.MAX_SAFE_INTEGER);
        }
        cache = _cache;
    }

    return Math.min(...cache);
}

function _minimumTotal(triangle: number[][]): number {
    for (let level = 1; level < triangle.length; level++) {
        for (let col = 0; col < triangle[level].length; col++) {
            triangle[level][col] += Math.min(
                triangle[level - 1][col - 1] ?? Number.MAX_SAFE_INTEGER,
                triangle[level - 1][col] ?? Number.MAX_SAFE_INTEGER
            );
        }
    }

    return Math.min(...triangle[triangle.length - 1]);
}

function test() {
    let triangle: number[][] = [];
    try {
        for (let n = 1; n <= 100; n++) {
            triangle = Array(n)
                .fill(undefined)
                .map((v, i) =>
                    Array(i)
                        .fill(undefined)
                        .map(() => Math.floor(Math.random() * 100))
                );
            assert.deepStrictEqual(
                minimumTotal(triangle.map((v) => v.slice())),
                _minimumTotal(triangle.map((v) => v.slice()))
            );
        }
    } catch (e) {
        console.log(triangle);
        if (e instanceof assert.AssertionError) {
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
