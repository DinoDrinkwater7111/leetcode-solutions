import assert from 'assert';
import _ from 'lodash';

function decodeString(s: string): string {
    let k = 0;
    let charCodes: number[] = [];
    const evStack: (string | number | undefined)[] = [];
    for (let i = 0; i < s.length; i++) {
        const charCode = s.charCodeAt(i);
        if (48 <= charCode && charCode <= 57) {
            k = k * 10 + charCode - 48;
        } else if (97 <= charCode && charCode <= 122) {
            charCodes.push(charCode);
        } else if (charCode === 91) {
            if (charCodes.length > 0) {
                evStack.push(String.fromCharCode(...charCodes));
                charCodes = [];
            }
            if (k > 0) {
                evStack.push(k);
                k = 0;
            }
        } else {
            if (charCodes.length > 0) {
                evStack.push(String.fromCharCode(...charCodes));
                charCodes = [];
            }
            let last = evStack.pop() as string;
            while (typeof evStack[evStack.length - 1] === 'string') {
                last = (evStack.pop() as string) + last;
            }
            evStack.push(last.repeat(evStack.pop() as number));
        }
    }

    if (charCodes.length > 0) evStack.push(String.fromCharCode(...charCodes));

    return (evStack as string[]).join('');
}

function _decodeString(s: string): string {
    function decodeStringEx(s: string): string {
        if (s.length === 0) return '';
        if (_.inRange(s.charCodeAt(0), 48, 58)) {
            const k = parseInt(s);
            const kLen = Math.floor(Math.log10(k)) + 1;
            let balance = 1;
            for (let i = kLen + 1; i < s.length; i++) {
                if (s[i] === '[') balance++;
                if (s[i] === ']') balance--;
                if (balance === 0)
                    return decodeStringEx(s.substring(kLen + 1, i)).repeat(k) + decodeStringEx(s.substring(i + 1));
            }
            throw new Error();
        } else {
            let i = 1;
            for (; i < s.length && _.inRange(s.charCodeAt(i), 97, 123); i++);
            return s.substring(0, i) + decodeStringEx(s.substring(i));
        }
    }

    return decodeStringEx(s);
}

//TODO
