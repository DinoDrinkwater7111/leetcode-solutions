import assert from 'assert';

const funcs = [
    function isPossible(nums: number[]): boolean {
        let curr = Number.NaN;
        let l1 = 0;
        let l2 = 0;
        /** length >= 3 */
        let l3 = 1;
        let i = 0;
        while (i < nums.length) {
            let next = nums[i];
            let nextCount = 1;
            while (nums[++i] === next) {
                nextCount++;
            }
            if (curr + 1 === next) {
                const currCount = l1 + l2 + l3;
                if (currCount === nextCount) {
                    l3 += l2;
                    l2 = l1;
                    l1 = 0;
                }
                if (currCount < nextCount) {
                    l3 += l2;
                    l2 = l1;
                    l1 = nextCount - currCount;
                }
                if (currCount > nextCount) {
                    if (l1 + l2 > nextCount) return false;
                    l3 = nextCount - l1;
                    l2 = l1;
                    l1 = 0;
                }
            } else {
                if (l1 > 0 || l2 > 0) {
                    return false;
                } else {
                    l1 = nextCount;
                    l3 = 0;
                }
            }
            curr = next;
        }
        return l1 === 0 && l2 === 0;
    },
];

type TestCase = Parameters<typeof funcs[number]>;
function* testCaseIterator(): Generator<TestCase> {
    //TODO
}

function test(testCase: TestCase, actualFuncInd: number, expectedFuncInd: number): boolean {
    try {
        assert.deepStrictEqual(funcs[actualFuncInd](...testCase), funcs[expectedFuncInd](...testCase));
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
