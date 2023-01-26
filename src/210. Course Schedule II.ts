import assert from 'assert';

const funcs = [
    function findOrder(numCourses: number, prerequisites: number[][]): number[] {
        const course2prerequisites = Array(numCourses)
            .fill(undefined)
            .map(() => new Set<number>());
        const prerequisite2courses = Array(numCourses)
            .fill(undefined)
            .map(() => [] as number[]);
        for (let i = 0; i < prerequisites.length; i++) {
            const course = prerequisites[i][0];
            const prerequisite = prerequisites[i][1];
            course2prerequisites[course].add(prerequisite);
            prerequisite2courses[prerequisite].push(course);
        }
        const result: number[] = [];
        let enrollableCourses: number[] = [];
        course2prerequisites.forEach((prerequisites, course) => {
            if (prerequisites.size === 0) enrollableCourses.push(course);
        });
        while (enrollableCourses.length > 0) {
            const enrollableCourses_: number[] = [];
            for (const prerequisite of enrollableCourses) {
                result.push(prerequisite);
                const candidateCourses = prerequisite2courses[prerequisite];
                for (const candidateCourse of candidateCourses) {
                    const prerequisites = course2prerequisites[candidateCourse]!;
                    prerequisites.delete(prerequisite);
                    if (prerequisites.size === 0) enrollableCourses_.push(candidateCourse);
                }
            }
            enrollableCourses = enrollableCourses_;
        }

        return result.length === numCourses ? result : [];
    },
    function findOrder(numCourses: number, prerequisites: number[][]): number[] {
        const course2prerequisites = new Map<number, Set<number>>();
        for (let i = 0; i < numCourses; i++) course2prerequisites.set(i, new Set());
        for (const [course, prerequisite] of prerequisites) course2prerequisites.get(course)!.add(prerequisite);
        const result: number[] = [];
        while (result.length < numCourses) {
            const start = result.length;
            for (const [course, prerequisites] of course2prerequisites) {
                if (prerequisites.size === 0) {
                    result.push(course);
                    course2prerequisites.delete(course);
                }
            }
            if (start === result.length) return [];
            for (const [course, prerequisites] of course2prerequisites) {
                for (let i = start; i < result.length; i++) prerequisites.delete(result[i]);
            }
        }

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
