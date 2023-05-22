import assert from 'assert';

const funcs = [
    function possibleBipartition(n: number, dislikes: number[][]): boolean {
        const num2dis = new Map<number, Set<number>>();
        for (let i = 0; i < dislikes.length; i++) {
            const n1 = dislikes[i][0];
            const n2 = dislikes[i][1];
            const dis1 = num2dis.get(n1) ?? new Set();
            dis1.add(n2);
            num2dis.set(n1, dis1);
            const dis2 = num2dis.get(n2) ?? new Set();
            dis2.add(n1);
            num2dis.set(n2, dis2);
        }

        for (const numInit of num2dis.keys()) {
            let currLevel = new Set<number>([numInit]);
            let isCurrG1 = true;
            const g1 = new Set<number>();
            const g2 = new Set<number>();
            while (currLevel.size > 0) {
                const currLevel_ = new Set<number>();
                for (const num of currLevel) {
                    const currG = isCurrG1 ? g1 : g2;
                    currG.add(num);
                    const dis = num2dis.get(num);
                    if (dis === undefined) continue;
                    for (const d of dis) {
                        if (currG.has(d)) return false;
                        currLevel_.add(d);
                    }
                    num2dis.delete(num);
                }
                currLevel = currLevel_;
                isCurrG1 = !isCurrG1;
            }
        }

        return true;
    },
    function possibleBipartition(n: number, dislikes: number[][]): boolean {
        const num2dislikes = new Map<number, Set<number>>();
        const add = (n1: number, n2: number) => {
            const d = num2dislikes.get(n1) ?? new Set();
            d.add(n2);
            num2dislikes.set(n1, d);
        };
        for (let i = 0; i < dislikes.length; i++) {
            const [n1, n2] = dislikes[i];
            add(n1, n2);
            add(n2, n1);
        }

        const isGroup1s: boolean[] = [];
        for (let i = 1; i <= n; i++) {
            let _nums = new Set([i]);
            if (isGroup1s[i] === undefined) isGroup1s[i] = true;
            let isGroup1 = !isGroup1s[i];
            while (_nums.size > 0) {
                const nums = new Set<number>();
                for (const _num of _nums) {
                    const ds = num2dislikes.get(_num);
                    if (ds === undefined) continue;
                    num2dislikes.delete(_num);
                    for (const d of ds) nums.add(d);
                }
                for (const num of nums) {
                    if (isGroup1s[num] === undefined) {
                        isGroup1s[num] = isGroup1;
                    } else if (isGroup1s[num] !== isGroup1) return false;
                }
                _nums = nums;
                isGroup1 = !isGroup1;
            }
        }

        return true;
    },
];

type TestCase = Parameters<(typeof funcs)[number]>;
function* testCaseIterator(): Generator<TestCase> {
    for(let i=0;i<100;i++){
        for (let n = 1; n <= 2000; n++) {
            let dislikes: number[][] = [];
            const nDislikes = (Math.random() * 1e4)>>0;
            for (let i = 0; i < nDislikes; i++) {
                dislikes.push([Math.floor(Math.random() * n) + 1, Math.floor(Math.random() * n) + 1]);
            }
            dislikes.forEach((dis) => dis.sort());
            dislikes = dislikes.filter((dis) => dis[0] !== dis[1]);
            dislikes = Array.from(new Set(dislikes.map((dis) => JSON.stringify(dis)))).map((dis) => JSON.parse(dis));
            yield [n, dislikes];
        }
    }
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
