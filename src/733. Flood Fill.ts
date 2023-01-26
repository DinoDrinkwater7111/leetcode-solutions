import assert from 'assert';

function floodFill(image: number[][], sr: number, sc: number, newColor: number): number[][] {
    const oldColor = image[sr][sc];
    if (oldColor === newColor) return image;
    function floodFillEx(sr: number, sc: number) {
        if (image[sr]?.[sc] !== oldColor) return;
        image[sr][sc] = newColor;
        floodFillEx(sr - 1, sc);
        floodFillEx(sr + 1, sc);
        floodFillEx(sr, sc - 1);
        floodFillEx(sr, sc + 1);
    }

    floodFillEx(sr, sc);

    return image;
}

function _floodFill(image: number[][], sr: number, sc: number, newColor: number): number[][] {
    const oldColor = image[sr][sc];
    const filled: boolean[][] = image.map(() => []);
    function floodFillEx(sr: number, sc: number) {
        if (image[sr]?.[sc] !== oldColor) return;
        if (filled[sr][sc]) return;
        image[sr][sc] = newColor;
        filled[sr][sc] = true;
        floodFillEx(sr - 1, sc);
        floodFillEx(sr + 1, sc);
        floodFillEx(sr, sc - 1);
        floodFillEx(sr, sc + 1);
    }

    floodFillEx(sr, sc);

    return image;
}

function test() {
    let image: number[][] = [];
    let sr: number = 0;
    let sc: number = 0;
    let newColor: number = 0;
    try {
        for (let n = 1; n <= 50; n++) {
            for (let m = 1; m <= 50; m++) {
                image = new Array(n).fill(undefined).map(() => {
                    return new Array(m).fill(undefined).map(() => Math.floor(Math.random() * 50));
                });
                sr = Math.floor(Math.random() * n);
                sc = Math.floor(Math.random() * m);
                newColor = Math.floor(Math.random() * 50);
                assert.deepStrictEqual(
                    floodFill(
                        image.map((v) => v.slice()),
                        sr,
                        sc,
                        newColor
                    ),
                    _floodFill(
                        image.map((v) => v.slice()),
                        sr,
                        sc,
                        newColor
                    )
                );
            }
        }
    } catch (e) {
        if (e instanceof assert.AssertionError) {
            console.log(image);
            console.log(sr);
            console.log(sc);
            console.log(newColor);
            console.log(e.message);
        } else {
            console.log(image);
            console.log(sr);
            console.log(sc);
            console.log(newColor);
            console.error(e);
        }
    }
}
test();
