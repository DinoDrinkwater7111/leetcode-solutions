import assert from 'assert';

const funcs = [
    function reorderedPowerOf2(n: number): boolean {
        function getCandidates(nDigit: number): number[][] {
            switch (nDigit) {
                case 1:
                    return [
                        [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
                    ];
                case 2:
                    return [
                        [0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
                        [0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
                    ];
                case 3:
                    return [
                        [0, 1, 1, 0, 0, 0, 0, 0, 1, 0],
                        [0, 0, 1, 0, 0, 1, 1, 0, 0, 0],
                        [0, 1, 1, 0, 0, 1, 0, 0, 0, 0],
                    ];
                case 4:
                    return [
                        [1, 1, 1, 0, 1, 0, 0, 0, 0, 0],
                        [1, 0, 1, 0, 1, 0, 0, 0, 1, 0],
                        [1, 0, 0, 0, 1, 0, 1, 0, 0, 1],
                        [0, 1, 1, 0, 0, 0, 0, 0, 1, 1],
                    ];
                case 5:
                    return [
                        [0, 1, 0, 1, 1, 0, 1, 0, 1, 0],
                        [0, 0, 1, 1, 0, 0, 1, 1, 1, 0],
                        [0, 0, 0, 1, 0, 2, 2, 0, 0, 0],
                    ];
                case 6:
                    return [
                        [1, 2, 1, 1, 0, 0, 0, 1, 0, 0],
                        [0, 1, 2, 0, 2, 0, 1, 0, 0, 0],
                        [0, 0, 2, 0, 1, 1, 0, 0, 2, 0],
                    ];
                case 7:
                    return [
                        [1, 1, 0, 0, 1, 1, 1, 1, 1, 0],
                        [1, 1, 2, 0, 0, 1, 0, 1, 0, 1],
                        [1, 1, 0, 1, 3, 0, 0, 0, 0, 1],
                        [1, 0, 0, 1, 0, 0, 1, 0, 4, 0],
                    ];
                case 8:
                    return [
                        [0, 2, 1, 0, 0, 0, 2, 3, 0, 0],
                        [0, 0, 1, 3, 2, 2, 0, 0, 0, 0],
                        [1, 1, 0, 0, 1, 0, 2, 1, 2, 0],
                    ];
                case 9:
                    return [
                        [0, 2, 2, 1, 1, 0, 0, 2, 1, 0],
                        [0, 0, 1, 1, 2, 2, 2, 0, 1, 0],
                        [1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
                    ];
                case 10:
                    return [];
                default:
                    throw new Error();
            }
        }
        const digit2count = Array(10).fill(0);
        let nDigit = 0;
        while (n > 0) {
            digit2count[n % 10]++;
            n = Math.floor(n / 10);
            nDigit++;
        }
        outer: for (const candidate of getCandidates(nDigit)) {
            for (let i = 0; i < 10; i++) {
                if (candidate[i] !== digit2count[i]) continue outer;
            }
            return true;
        }
        return false;
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
