import assert from 'assert';

const funcs = [
    function maxPerformance(n: number, speed: number[], efficiency: number[], k: number): number {
        const indByEffDesc = Array(n)
            .fill(0)
            .map((v, i) => i)
            .sort((a, b) => efficiency[b] - efficiency[a]);

        const speed_desc = speed.slice().sort((a, b) => b - a);
        let speedSum = 0;
        let speedSumNextInd = 0;
        for (; speedSumNextInd < k - 1; speedSumNextInd++) speedSum += speed_desc[speedSumNextInd];

        function findInfInd(target: number): number {
            let start = 0;
            let end = speed_desc.length;
            while (start < end) {
                const mid = (start + end) >> 1;
                if (Math.abs(speed_desc[mid]) < target || speed_desc[mid] === target) end = mid;
                else start = mid + 1;
            }
            return start;
        }

        let max = 0;
        let resultSpeedSum = Number.NaN;
        let resultMinEff = Number.NaN;
        for (let i = 0; i < n; i++) {
            const ind = indByEffDesc[i];
            const minEff = efficiency[ind];
            const speed_minEff = speed[ind];
            const speed_descInd = findInfInd(speed_minEff);
            if (speed_descInd < speedSumNextInd) {
                speedSum += speed_desc[speedSumNextInd++] ?? 0;
                if (speedSum * minEff > max) {
                    max = speedSum * minEff;
                    resultSpeedSum = speedSum;
                    resultMinEff = minEff;
                }
                speedSum -= speed_desc[speed_descInd];
            } else {
                const resultSpeedSum_ = speedSum + speed_desc[speed_descInd];
                if (resultSpeedSum_ * minEff > max) {
                    max = resultSpeedSum_ * minEff;
                    resultSpeedSum = resultSpeedSum_;
                    resultMinEff = minEff;
                }
            }
            speed_desc[speed_descInd] *= -1;
            while (speed_desc[speedSumNextInd] < 0) speedSumNextInd++;
        }

        const mod = 1e9 + 7;
        const sqrtMinEff = Math.floor(Math.sqrt(resultMinEff));
        const speedSum_mod = resultSpeedSum % mod;
        return (
            (((((speedSum_mod * sqrtMinEff) % mod) * sqrtMinEff) % mod) +
                ((speedSum_mod * (resultMinEff - sqrtMinEff * sqrtMinEff)) % mod)) %
            mod
        );
    },
    function maxPerformance(n: number, speed: number[], efficiency: number[], k: number): number {
        const indByEff: number[] = Array(n)
            .fill(0)
            .map((v, i) => i)
            .sort((a, b) => efficiency[a] - efficiency[b]);

        const speed_desc = speed.slice().sort((a, b) => b - a);
        let speedSum = 0;
        let speedSumNextInd = 0;
        for (; speedSumNextInd < k - 1; speedSumNextInd++) speedSum += speed_desc[speedSumNextInd];

        function findInfInd(target: number): number {
            let start = 0;
            let end = speed_desc.length;
            while (start < end) {
                const mid = (start + end) >> 1;
                if (Math.abs(speed_desc[mid]) < target || speed_desc[mid] === target) end = mid;
                else start = mid + 1;
            }
            return start;
        }

        let max = 0;
        let resultSpeedSum = Number.NaN;
        let resultMinEff = Number.NaN;
        for (let i = 0; i < n; i++) {
            const ind = indByEff[i];
            const minEff = efficiency[ind];
            const speed_minEff = speed[ind];
            const speed_descInd = findInfInd(speed_minEff);
            if (speed_descInd < speedSumNextInd) {
                speedSum += speed_desc[speedSumNextInd++] ?? 0;
                if (speedSum * minEff > max) {
                    max = speedSum * minEff;
                    resultSpeedSum = speedSum;
                    resultMinEff = minEff;
                }
                speedSum -= speed_desc[speed_descInd];
            } else {
                const resultSpeedSum_ = speedSum + speed_desc[speed_descInd];
                if (resultSpeedSum_ * minEff > max) {
                    max = resultSpeedSum_ * minEff;
                    resultSpeedSum = resultSpeedSum_;
                    resultMinEff = minEff;
                }
            }
            speed_desc[speed_descInd] *= -1;
            while (speed_desc[speedSumNextInd] < 0) speedSumNextInd++;
        }

        const mod = 1e9 + 7;
        const sqrtMinEff = Math.floor(Math.sqrt(resultMinEff));
        const speedSum_mod = resultSpeedSum % mod;
        return (
            (((((speedSum_mod * sqrtMinEff) % mod) * sqrtMinEff) % mod) +
                ((speedSum_mod * (resultMinEff - sqrtMinEff * sqrtMinEff)) % mod)) %
            mod
        );
    },
    function maxPerformance(n: number, speed: number[], efficiency: number[], k: number): number {
        const indByEff: number[] = Array(n)
            .fill(0)
            .map((v, i) => i)
            .sort((a, b) => efficiency[a] - efficiency[b]);

        const speed2count = new Map<number, number>();
        {
            const speed_desc = speed.slice().sort((a, b) => b - a);
            for (const speed of speed_desc) speed2count.set(speed, (speed2count.get(speed) ?? 0) + 1);
        }

        let result = 0;
        for (let i = 0; i < n; i++) {
            const ind = indByEff[i];
            const minEff = efficiency[ind];
            let speedSum = speed[ind];
            const speedCount = speed2count.get(speed[ind])!;
            if (speedCount === 1) speed2count.delete(speed[ind]);
            else speed2count.set(speed[ind], speedCount - 1);
            let remain = k - 1;
            for (const [speed, count] of speed2count) {
                const maxUsage = Math.min(remain, count);
                speedSum += speed * maxUsage;
                remain -= maxUsage;
                if (remain === 0) break;
            }
            result = Math.max(result, speedSum * minEff);
        }

        const mod = 10 ** 9 + 7;
        return result % mod;
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
