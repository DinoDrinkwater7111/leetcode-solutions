import assert from 'assert';

function nearestValidPoint(x: number, y: number, points: number[][]): number {
    let result = -1;
    let min = Number.POSITIVE_INFINITY;
    for (let i = points.length - 1; i >= 0; i--) {
        const [x2, y2] = points[i];
        if (x !== x2 && y !== y2) continue;
        const distance = Math.abs(x - x2)+ Math.abs(y - y2);
        if (distance <= min) {
            min = distance;
            result = i;
        }
    }
    return result;
}


//TODO