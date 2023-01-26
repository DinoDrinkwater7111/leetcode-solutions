import assert from 'assert';

const funcs = [
    function uniqueMorseRepresentations(words: string[]): number {
        const charCode2morseCode = [
            '.-',
            '-...',
            '-.-.',
            '-..',
            '.',
            '..-.',
            '--.',
            '....',
            '..',
            '.---',
            '-.-',
            '.-..',
            '--',
            '-.',
            '---',
            '.--.',
            '--.-',
            '.-.',
            '...',
            '-',
            '..-',
            '...-',
            '.--',
            '-..-',
            '-.--',
            '--..',
        ];

        const transformations = new Set<String>();
        words.map((word) => {
            const morseCodeArr: string[] = [];
            for (let i = 0; i < word.length; i++) {
                morseCodeArr.push(charCode2morseCode[word.charCodeAt(i) - 97]);
            }
            transformations.add(morseCodeArr.join(''));
        });
        return transformations.size;
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
