import assert from "assert";

function average(salary: number[]): number {
    let max = Number.NEGATIVE_INFINITY;
    let min = Number.POSITIVE_INFINITY;
    let sum = 0;
    for (const sal of salary) {
        sum += sal;
        max = Math.max(max, sal);
        min = Math.min(min, sal);
    }
    return (sum - max - min) / (salary.length - 2);
}

//TODO
