import assert from 'assert';

function kClosest(points: number[][], k: number): number[][] {
    points.sort((a, b) => (a[0] - b[0]) * (a[0] + b[0]) + (a[1] - b[1]) * (a[1] + b[1]));
    return points.slice(0, k);
}

function _kClosest(points: number[][], k: number): number[][] {
    const resultIndArr: number[] = [0];
    const distance: number[] = [];
    for (const point of points) distance.push(point[0] * point[0] + point[1] * point[1]);
    function findSupInd(targetInd: number): number {
        if (distance[resultIndArr[resultIndArr.length - 1]] <= distance[targetInd]) return resultIndArr.length;
        let start = 0;
        let end = resultIndArr.length - 1;
        while (start < end) {
            const mid = (start + end) >> 1;
            if (distance[targetInd] <= distance[resultIndArr[mid]]) {
                end = mid;
            } else {
                start = mid + 1;
            }
        }
        return start;
    }
    for (let i = 1; i < points.length; i++) {
        const supInd = findSupInd(i);
        resultIndArr.splice(supInd, 0, i);
        if (resultIndArr.length > k) resultIndArr.pop();
    }
    return resultIndArr.map((ind) => points[ind]);
}

//TODO
