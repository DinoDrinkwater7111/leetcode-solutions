import assert from "assert";

function areAlmostEqual(s1: string, s2: string): boolean {
    const swapChar: string[] = [];
    for (let i = 0; i < s1.length; i++) {
        if (s1[i] === s2[i]) continue;
        switch (swapChar.length) {
            case 0: {
                swapChar.push(s1[i], s2[i]);
                break;
            }
            case 2: {
                if (swapChar[0] !== s2[i] || swapChar[1] !== s1[i]) return false;
                swapChar.push(''); //make swapChar.length === 3
                break;
            }
            default:
                return false;
        }
    }
    return swapChar.length === 3 || swapChar.length === 0;
}

//TODO
