import assert from 'assert';

function minCostConnectPoints(points: number[][]): number {
    if (points.length === 1) return 0;
    function getDistance(i: number, j: number): number {
        return Math.abs(points[i][0] - points[j][0]) + Math.abs(points[i][1] - points[j][1]);
    }

    function minCostEx(distanceTable: number[][]): number {
        const group2points: number[][] = [[0]];
        const point2group: number[] = [0];
        let result = 0;

        for (let i = 1; i < distanceTable.length; i++) {
            if (point2group[i] !== undefined) continue;
            let min = Number.POSITIVE_INFINITY;
            let minInd = -1;
            for (let j = 0; j < distanceTable.length; j++) {
                if (i === j) continue;
                if (distanceTable[i][j] < min) {
                    min = distanceTable[i][j];
                    minInd = j;
                }
            }
            result += min;
            if (point2group[minInd] === undefined) {
                point2group[minInd] = group2points.length;
                point2group[i] = group2points.length;
                group2points[group2points.length] = [i, minInd];
            } else {
                point2group[i] = point2group[minInd];
                group2points[point2group[minInd]].push(i);
            }
        }

        if (group2points.length === 1) {
            return result;
        } else {
            const distanceTable_: number[][] = [];
            for (let i = 0; i < group2points.length; i++) {
                distanceTable_[i] = [];
                for (let j = 0; j < group2points.length; j++) {
                    const points_i = group2points[i];
                    const points_j = group2points[j];
                    let min = Number.POSITIVE_INFINITY;
                    for (const point_i of points_i) {
                        if (min === 0) break;
                        for (const point_j of points_j) {
                            if (min === 0) break;
                            min = Math.min(min, distanceTable[point_i][point_j]);
                        }
                    }
                    distanceTable_[i][j] = min;
                }
            }

            return result + minCostEx(distanceTable_);
        }
    }

    const distanceTable: number[][] = [];
    for (let i = 0; i < points.length; i++) {
        distanceTable[i] = [];
        for (let j = 0; j < points.length; j++) {
            distanceTable[i][j] = getDistance(i, j);
        }
    }

    return minCostEx(distanceTable);
}

const res = minCostConnectPoints([
    [0, 0],
    [2, 2],
    [3, 10],
    [5, 2],
    [7, 0]
]);
console.log(res);
