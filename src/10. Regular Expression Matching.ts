import assert from 'assert';

function isMatch(s: string, p: string): boolean {
    type RxChar = { char: string; isOptional: boolean };

    const rxChars: RxChar[] = [];
    for (let i = 0; i < p.length; i++) {
        if (p.charAt(i + 1) === '*') {
            rxChars.push({ char: p.charAt(i), isOptional: true });
            i++;
        } else {
            rxChars.push({ char: p.charAt(i), isOptional: false });
        }
    }

    function _isMatch(s1: string, s2: string | undefined) {
        return s1 === '.' || s2 === '.' || s1 === s2;
    }

    const checkResult: boolean[][] = Array(s.length + 1)
        .fill(undefined)
        .map(() => []);

    function check(arg: { sInd: number; rxInd: number }): boolean {
        if (checkResult[arg.sInd]?.[arg.rxInd] !== undefined) {
            return checkResult[arg.sInd]?.[arg.rxInd]!;
        }

        if (arg.sInd >= s.length) {
            for (let i = arg.rxInd; i < rxChars.length; i++) {
                if (!rxChars[i]!.isOptional) {
                    return false;
                }
            }
            return true;
        }

        const sChar = s.charAt(arg.sInd);
        const rxChar = rxChars[arg.rxInd]?.char;
        let ans: boolean;
        if (rxChars[arg.rxInd]?.isOptional) {
            const isPassed = check({ sInd: arg.sInd, rxInd: arg.rxInd + 1 });
            if (isPassed) {
                ans = true;
            } else {
                if (_isMatch(sChar, rxChar)) {
                    ans = check({ sInd: arg.sInd + 1, rxInd: arg.rxInd });
                } else {
                    ans = false;
                }
            }
        } else {
            if (_isMatch(sChar, rxChar)) {
                ans = check({ sInd: arg.sInd + 1, rxInd: arg.rxInd + 1 });
            } else {
                ans = false;
            }
        }
        checkResult[arg.sInd]![arg.rxInd] = ans;
        return ans;
    }

    return check({ sInd: 0, rxInd: 0 });
}

function _isMatch(s: string, p: string): boolean {
    const rx = new RegExp(`^${p}$`);
    return rx.test(s)
}

function test() {
    let s: string = '';
    let p: string = '';
    const charPool = ['1', '2', '3'];
    try {
        s = 'aaaaaaaaaaaaab';
        p = 'a*a*a*a*a*c';
        assert.equal(isMatch(s, p), _isMatch(s, p));
        
        s = '456tyj6585et466662es';
        p = '.56.*j658*7*2*5et466*6.es';
        assert.equal(isMatch(s, p), _isMatch(s, p));
        
        s = '123456780';
        p = '9*';
        assert.equal(isMatch(s, p), _isMatch(s, p));

        s = '123456780';
        p = '1234567809';
        assert.equal(isMatch(s, p), _isMatch(s, p));
    } catch (e) {
        if (e instanceof assert.AssertionError) {
            console.log(s);
            console.log(p);
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();