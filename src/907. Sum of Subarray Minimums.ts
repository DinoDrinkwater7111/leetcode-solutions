import assert from 'assert';

const funcs = [
    function sumSubarrayMins(arr: number[]): number {
        // mono stack
        const values = [arr[0]];
        const indexes = [0];
        indexes[-1] = -1;
        const dp = [arr[0]];
        dp[-1] = 0;

        for (let i = 1; i < arr.length; i++) {
            const value = arr[i];
            while (values[values.length - 1] >= value) {
                values.pop();
                indexes.pop();
            }
            values.push(value);
            indexes.push(i);
            const prevInd = indexes[indexes.length - 2];
            dp[i] = dp[prevInd] + (i - prevInd) * value;
        }

        const mod = 1e9 + 7;
        let result = 0;
        for (let i = 0; i < dp.length; i++) result = (result + dp[i]) % mod;
        return result;
    },
    function sumSubarrayMins(arr: number[]): number {
        let maxInd = 0;
        // mono stack, up to maxInd
        const values = [arr[0]];
        const indexs = [0];
        indexs[-1] = -1;
        const dp = [arr[0]];
        dp[-1] = 0;

        function findValuesSupInd(n: number): number {
            let start = 0;
            let end = maxInd + 1;
            while (start < end) {
                const mid = (start + end) >> 1;
                if (values[mid] < n) start = mid + 1;
                else end = mid;
            }
            return start;
        }

        for (let i = 1; i < arr.length; i++) {
            const value = arr[i];
            maxInd = findValuesSupInd(value);
            values[maxInd] = value;
            indexs[maxInd] = i;
            const prevInd = indexs[maxInd - 1];
            dp[i] = dp[prevInd] + (i - prevInd) * value;
        }

        const mod = 1e9 + 7;
        let result = 0;
        for (let i = 0; i < dp.length; i++) result = (result + dp[i]) % mod;
        return result;
    },
    function sumSubarrayMins(arr: number[]): number {
        const mod = 1e9 + 7;
        let result = arr[0];
        let maxInd = 0;
        // mono stack, up to maxInd
        const values: number[] = [arr[0]];
        const indexs: number[] = [0];

        function findSupInd(n: number): number {
            let start = 0;
            let end = maxInd + 1;
            while (start < end) {
                const mid = (start + end) >> 1;
                if (values[mid] < n) start = mid + 1;
                else end = mid;
            }
            return start;
        }

        for (let i = 1; i < arr.length; i++) {
            maxInd = findSupInd(arr[i]);
            values[maxInd] = arr[i];
            indexs[maxInd] = i;
            let currInd = 0;
            for (let j = 0; j <= maxInd; j++) {
                const ind = indexs[j];
                result += (ind - currInd + 1) * values[j];
                result %= mod;
                currInd = ind + 1;
            }
        }
        return result;
    },
    function sumSubarrayMins(arr: number[]): number {
        const mod = 1e9 + 7;
        const dp: number[] = [arr[0]];
        dp[-1] = 0;

        for (let i = 1; i < arr.length; i++) {
            const num = arr[i];
            let firstLessThenInd = i;
            while (arr[firstLessThenInd] >= num) firstLessThenInd--;
            dp[i] = (dp[firstLessThenInd] + (i - firstLessThenInd) * num) % mod;
        }

        let result = 0;
        for (let i = 0; i < dp.length; i++) result = (result + dp[i]) % mod;
        return result;
    },
    function sumSubarrayMins(arr: number[]): number {
        const mod = 1e9 + 7;
        const regionedIndexs: number[][] = Array(300)
            .fill(undefined)
            .map(() => []);
        const dp: number[] = [];
        let min = arr[0];
        for (let i = 0; i < arr.length; i++) {
            const region = ((arr[i] - 1) / 100) >> 0;
            min = Math.min(min, arr[i]);
            if (min === arr[i]) {
                dp[i] = (i + 1) * arr[i];
            } else {
                let maxInd = Number.NEGATIVE_INFINITY;
                for (let r = region; r >= 0; r--) {
                    const indexs = regionedIndexs[r];
                    for (let j = indexs.length - 1; j >= 0; j--) {
                        const ind = indexs[j];
                        if (arr[ind] <= arr[i]) {
                            maxInd = Math.max(maxInd, ind);
                            break;
                        }
                    }
                }
                dp[i] = dp[maxInd] + (i - maxInd) * arr[i];
            }
            regionedIndexs[region].push(i);
        }
        let result = 0;
        for (let i = 0; i < dp.length; i++) result = (result + dp[i]) % mod;
        return result;
    },
];

type TestCase = Parameters<(typeof funcs)[number]>;
function* testCaseIterator(): Generator<TestCase> {
    //TODO
}

function test(testCase: TestCase, actualFuncInd: number, expectedFuncInd: number): boolean {
    try {
        const json = JSON.stringify(testCase);
        assert.deepStrictEqual(
            funcs[actualFuncInd](...(JSON.parse(json) as TestCase)),
            funcs[expectedFuncInd](...(JSON.parse(json) as TestCase))
        );
        return true;
    } catch (e) {
        console.log('❌'.repeat(32));
        console.log(`actualFuncInd: ${actualFuncInd}`);
        console.log(`expectedFuncInd: ${expectedFuncInd}`);
        console.log(`testCase: ${JSON.stringify(testCase)}`);
        if (e instanceof assert.AssertionError) {
            console.log(e.message);
        } else {
            console.error(e);
        }
        return false;
    }
}

{
    let count = 0;
    outer: for (const testCase of testCaseIterator()) {
        if (++count < 10) {
            console.log('----------------------------------------------------');
            console.log(`Testcase ${count}:`);
            console.log(JSON.stringify(testCase, undefined, 2));
        }
        for (let i = 0; i < funcs.length - 1; i++) {
            if (!test(testCase, i, i + 1)) break outer;
        }
    }
}
