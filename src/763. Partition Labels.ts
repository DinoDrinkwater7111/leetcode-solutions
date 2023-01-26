import assert from 'assert';

function partitionLabels(s: string): number[] {
    const charCode2MaxIndex: number[] = [];
    for (let i = 0; i < s.length; i++) charCode2MaxIndex[s.charCodeAt(i) - 97] = i;
    const result: number[] = [];
    let start = 0;
    let end = -1;
    for (let i = 0; i < s.length; i++) {
        end = Math.max(end, charCode2MaxIndex[s.charCodeAt(i) - 97]);
        if (i === end) {
            result.push(end - start + 1);
            start = i + 1;
            end = -1;
        }
    }

    return result;
}

function _partitionLabels(s: string): number[] {
    const charCode2Indexes: number[][] = Array(26)
        .fill(undefined)
        .map(() => []);
    for (let i = 0; i < s.length; i++) {
        charCode2Indexes[s.charCodeAt(i) - 97].push(i);
    }
    const result: number[] = [];
    let start = 0;
    let end = -1;
    for (let i = 0; i < s.length; i++) {
        const indexes = charCode2Indexes[s.charCodeAt(i) - 97];
        end = Math.max(end, indexes[indexes.length - 1]);
        if (i === end) {
            result.push(end - start + 1);
            start = i + 1;
            end = -1;
        }
    }

    return result;
}

//TODO
