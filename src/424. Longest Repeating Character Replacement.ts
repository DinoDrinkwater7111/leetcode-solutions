import assert from 'assert';

function characterReplacement(s: string, k: number): number {
    const charSet = new Set<string>();
    for (const char of s) charSet.add(char);
    let result = k;
    charSet.forEach((char) => {
        let start = 0;
        let end = 0;
        let _k_ = k;
        while (end < s.length) {
            if (s[end] === char) {
                end++;
            } else {
                if (_k_ > 0) {
                    _k_--;
                    end++;
                } else {
                    if (s[start] !== char) _k_++;
                    start++;
                }
            }
            result = Math.max(result, end - start);
        }
    });
    return result;
}

function _characterReplacement(s: string, k: number): number {

}
