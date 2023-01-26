import assert from 'assert';

function minRemoveToMakeValid(s: string): string {
    const charArr = Array.from(s);
    let openInds: number[] = [];
    for (let i = 0; i < charArr.length; i++) {
        switch (charArr[i]) {
            case '(':
                {
                    openInds.push(i);
                }
                break;
            case ')':
                {
                    if (openInds.length === 0) charArr[i] = '';
                    else openInds.pop();
                }
                break;
            default:
        }
    }
    for (const ind of openInds) charArr[ind] = '';
    return charArr.join('');
}

function _minRemoveToMakeValid(s: string): string {}

//TODO
