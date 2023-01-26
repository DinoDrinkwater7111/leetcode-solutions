import assert from 'assert';

function findAnagrams_(s: string, p: string): number[] {
    if (s.length < p.length) return [];
    const charCode2count_p: number[] = Array(26).fill(0);
    for (let i = 0; i < p.length; i++) charCode2count_p[p.charCodeAt(i) - 97]++;

    const charCode2count_substr = Array(26).fill(0);
    for (let i = 0; i < p.length; i++) charCode2count_substr[s.charCodeAt(i) - 97]++;

    const result: number[] = [0];
    const checkSet = new Set<number>();
    for (let i = 0; i < charCode2count_p.length; i++) {
        if (charCode2count_p[i] !== charCode2count_substr[i]) {
            checkSet.add(i);
            result.pop();
        }
    }
    for (let i = 1; i <= s.length - p.length; i++) {
        const previousCharCode = s.charCodeAt(i - 1) - 97;
        charCode2count_substr[previousCharCode]--;
        checkSet.add(previousCharCode);

        const lastCharCode = s.charCodeAt(i + p.length - 1) - 97;
        charCode2count_substr[lastCharCode]++;
        checkSet.add(lastCharCode);

        checkSet.forEach((i) => {
            if (charCode2count_p[i] === charCode2count_substr[i]) checkSet.delete(i);
        });
        if (checkSet.size === 0) result.push(i);
    }

    return result;
}

function findAnagrams(s: string, p: string): number[] {
    if (s.length < p.length) return [];
    const charCode2count_p: number[] = Array(26).fill(0);
    for (let i = 0; i < p.length; i++) charCode2count_p[p.charCodeAt(i) - 97]++;

    const charCode2count_substr = Array(26).fill(0);
    for (let i = 0; i < p.length; i++) charCode2count_substr[s.charCodeAt(i) - 97]++;

    const result: number[] = [];
    function check(): boolean {
        for (let i = 0; i < charCode2count_p.length; i++) {
            if (charCode2count_p[i] !== charCode2count_substr[i]) return false;
        }
        return true;
    }
    if (check()) result.push(0);
    for (let i = 1; i <= s.length - p.length; i++) {
        charCode2count_substr[s.charCodeAt(i - 1) - 97]--;
        charCode2count_substr[s.charCodeAt(i + p.length - 1) - 97]++;
        if (check()) result.push(i);
    }

    return result;
}

function _findAnagrams(s: string, p: string): number[] {
    const sorted_p = Array.from(p).sort().join('');
    const result: number[] = [];
    for (let i = 0; i <= s.length - p.length; i++) {
        const candidate = s.substring(i, i + p.length);
        if (Array.from(s).sort().join('') === sorted_p) result.push(i);
    }
    return result;
}

//TODO
