import assert from 'assert';

function countAndSay(n: number): string {
    if (n === 1) return '1';
    const previous = countAndSay(n - 1);
    const resultSubStrs: string[] = [];
    let i = 0;
    while (i < previous.length) {
        let currChar = previous[i];
        let count = 0;
        while (previous[i] === currChar) {
            count++;
            i++;
        }
        resultSubStrs.push(`${count}${currChar}`);
    }
    return resultSubStrs.join('');
}

function _countAndSay(n: number): string {
    
}

//TODO
