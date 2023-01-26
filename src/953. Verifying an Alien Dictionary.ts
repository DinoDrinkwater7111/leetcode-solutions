import assert from "assert";

function isAlienSorted(words: string[], order: string): boolean {
    const mappedCharCode2Ind: number[] = [];
    for (let i = 0; i < order.length; i++) {
        mappedCharCode2Ind[order.charCodeAt(i)] = i;
    }

    function isInOrder(a: string, b: string) {
        const minLen = Math.min(a.length, b.length);
        for (let i = 0; i < minLen; i++) {
            const orderInd_a = mappedCharCode2Ind[a.charCodeAt(i)];
            const orderInd_b = mappedCharCode2Ind[b.charCodeAt(i)];
            if (orderInd_a > orderInd_b) {
                return false;
            } else if (orderInd_a < orderInd_b) {
                return true;
            }
        }
        return a.length <= b.length;
    }

    for (let i = 1; i < words.length; i++) {
        if (!isInOrder(words[i - 1], words[i])) return false;
    }
    return true;
}


//TODO