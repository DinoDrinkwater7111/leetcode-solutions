import assert from 'assert';

function findRepeatedDnaSequences(s: string): string[] {
    const seq2repeated = new Map<string, boolean>();
    for (let i = 0; i <= s.length - 10; i++) {
        const seq = s.substring(i, i + 10);
        seq2repeated.set(seq, seq2repeated.get(seq) !== undefined);
    }

    const result: string[] = [];
    seq2repeated.forEach((repeated, seq) => {
        if (repeated) result.push(seq);
    });
    return result;
}

function _findRepeatedDnaSequences(s: string): string[] {
    const num2CharCode: number[] = [65, 67, 71, 84];

    const num2repeated: boolean[] = [];
    let num = 0;
    for (let j = 0; j < 10; j++) {
        num <<= 2;
        num |= num2CharCode.indexOf(s.charCodeAt(j));
    }
    num2repeated[num] = false;
    for (let i = 10; i < s.length; i++) {
        num &= 0b00111111111111111111;
        num <<= 2;
        num |= num2CharCode.indexOf(s.charCodeAt(i));
        num2repeated[num] = num2repeated[num] !== undefined;
    }

    const result: string[] = [];
    num2repeated.forEach((repeated, num) => {
        if (repeated) {
            const charCodes: number[] = [];
            for (let i = 0; i < 10; i++) {
                const binaryVal = num & 0b11;
                charCodes[9 - i] = num2CharCode[binaryVal];
                num >>= 2;
            }
            result.push(String.fromCharCode(...charCodes));
        }
    });

    return result;
}

//TODO
