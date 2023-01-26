import assert from 'assert';

function multiply(num1: string, num2: string): string {

}

function _multiply(num1: string, num2: string): string {
    function getNumArr(numStr: string): number[] {
        const result: number[] = [];
        for (let i = numStr.length - 1; i >= 0; i--) {
            result.push(numStr.charCodeAt(i) - 48);
        }
        return result;
    }

    const num1Arr: number[] = getNumArr(num1);
    const num2Arr: number[] = getNumArr(num2);

    // cache[i] = num1 * i;
    const cache: number[][] = [];
    function mul(n: number): number[] {
        if (cache[n] === undefined) {
            cache[n] = [];
            for (let i = 0; i < num1Arr.length; i++) {
                cache[n][i] = num1Arr[i] * n;
            }
            for (let i = 0; i < num1Arr.length - 1; i++) {
                if (cache[n][i] >= 10) {
                    cache[n][i + 1] += Math.floor(cache[n][i] / 10);
                    cache[n][i] %= 10;
                }
            }
            {
                const last = num1Arr.length - 1;
                if (cache[n][last] >= 10) {
                    cache[n][last + 1] = Math.floor(cache[n][last] / 10);
                    cache[n][last] %= 10;
                }
            }
        }
        return cache[n];
    }

    function add(num: number[], shift: number, to: number[]): void {
        for (let i = to.length; i < num.length + shift; i++) to[i] = 0;
        for (let i = 0; i < num.length; i++) to[i + shift] += num[i];
        for (let i = shift; i < to.length - 1; i++) {
            if (to[i] >= 10) {
                to[i + 1] += 1;
                to[i] -= 10;
            }
        }
        {
            const last = to.length - 1;
            if (to[last] >= 10) {
                to[last + 1] = 1;
                to[last] -= 10;
            }
        }
    }

    const resultArr: number[] = [];
    for (let i = 0; i < num2Arr.length; i++) {
        add(mul(num2Arr[i]), i, resultArr);
    }

    for(let i=resultArr.length-1;i>=1;i--){
        if(resultArr[i]===0) resultArr.pop();
        else break;
    }

    return resultArr.reverse().join("")
}

//TODO
