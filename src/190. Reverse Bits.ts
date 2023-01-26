import assert from 'assert';

const reversed = [
    0b0000, 0b1000, 0b0100, 0b1100, 0b0010, 0b1010, 0b0110, 0b1110, 0b0001, 0b1001, 0b0101, 0b1101, 0b0011, 0b1011,
    0b0111, 0b1111,
];
function reverseBits(n: number): number {
    let result = 0;
    for (let i = 0; i < 8; i++) {
        result <<= 4;
        result |= reversed[n & 0b1111];
        n >>>= 4;
    }
    return result >>> 0;
}

function _reverseBits(n: number): number {
    const binaryStr = n.toString(2);
    const fullBinaryStr = new Array(32 - binaryStr.length).fill('0').join('') + binaryStr;
    return Number('0b' + Array.from(fullBinaryStr).reverse().join(''));
}

function test() {
    let n: number = 0;
    try {
        for (n = 0; n <= 1024; n++) {
            assert.deepStrictEqual(reverseBits(n), _reverseBits(n));
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
