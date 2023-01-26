import assert from 'assert';

const funcs = [
    function findDuplicate(paths: string[]): string[][] {
        const content2paths = new Map<string, string[]>();
        for (const path of paths) {
            const splited = path.split(' ');
            const dir = splited[0];
            for (let i = 1; i < splited.length; i++) {
                const [baseFileName, content] = splited[i].split('.txt');
                const paths = content2paths.get(content) ?? [];
                paths.push(`${dir}/${baseFileName}.txt`);
                content2paths.set(content, paths);
            }
        }
        const result: string[][] = [];
        for (const paths of content2paths.values()) if (paths.length > 1) result.push(paths);
        return result;
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
