import assert from 'assert';

function backspaceCompare(s: string, t: string): boolean {
    let end_s = s.length - 1;
    let nbackSpace_s = 0;
    let end_t = t.length - 1;
    let nbackSpace_t = 0;
    while (end_s >= 0 || end_t >= 0) {
        if (s[end_s] === '#') {
            nbackSpace_s++;
            end_s--;
            continue;
        } else if (nbackSpace_s > 0) {
            nbackSpace_s--;
            end_s--;
            continue;
        }
        if (t[end_t] === '#') {
            nbackSpace_t++;
            end_t--;
            continue;
        } else if (nbackSpace_t > 0) {
            nbackSpace_t--;
            end_t--;
            continue;
        }
        if (s[end_s] !== t[end_t]) {
            return false;
        } else {
            end_s--;
            end_t--;
        }
    }
    return true;
}

function _backspaceCompare(s: string, t: string): boolean {
    const stack_s: string[] = [];
    for (const char of s) {
        if (char === '#') stack_s.pop();
        else stack_s.push(char);
    }
    const stack_t: string[] = [];
    for (const char of t) {
        if (char === '#') stack_t.pop();
        else stack_t.push(char);
    }
    return stack_s.join('') === stack_t.join('');
}

//TODO
