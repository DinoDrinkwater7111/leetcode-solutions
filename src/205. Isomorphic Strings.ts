import assert from 'assert';

function isIsomorphic(s: string, t: string): boolean {
    function isIsomorphicWeak(s: string, t: string): boolean {
        const map = new Map<string, string>();
        for (let i = 0; i < s.length; i++) {
            const mappedChar = map.get(s[i]);
            if (mappedChar === undefined) {
                map.set(s[i], t[i]);
            } else {
                if (mappedChar !== t[i]) return false;
            }
        }

        return true;
    }

    return isIsomorphicWeak(s, t) && isIsomorphicWeak(t, s);
}

function _isIsomorphic(s: string, t: string): boolean {}

//TODO
