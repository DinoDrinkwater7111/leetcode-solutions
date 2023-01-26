import assert from 'assert';

function groupAnagrams(strs: string[]): string[][] {
    const sortedStrs: string[] = [];
    for (const s of strs) {
        sortedStrs.push(Array.from(s).sort().join(''));
    }

    const result: string[][] = [];
    const str2Group = new Map<string, number>();
    for (let i = 0; i < strs.length; i++) {
        const str = strs[i];
        const sortedStr = sortedStrs[i];
        let group = str2Group.get(sortedStr);
        if (group === undefined) {
            group = str2Group.size;
            str2Group.set(sortedStr, group);
            result[group] = [];
        }
        result[group].push(str);
    }

    return result;
}

function _groupAnagrams(strs: string[]): string[][] {

}

//TODO
