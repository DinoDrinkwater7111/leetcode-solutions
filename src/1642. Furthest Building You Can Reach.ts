import assert from 'assert';

function furthestBuilding(heights: number[], bricks: number, ladders: number): number {
    //DESC
    const maxDiffs: number[] = Array(ladders).fill(0);
    function findInfInd(target: number): number {
        if (maxDiffs[maxDiffs.length - 1] >= target) return maxDiffs.length;
        let start = 0;
        let end = maxDiffs.length - 1;
        while (start < end) {
            const mid = (start + end) >> 1;
            if (target >= maxDiffs[mid]) {
                end = mid;
            } else {
                start = mid + 1;
            }
        }
        return start;
    }

    let diffSum = 0;
    for (let i = 1; i < heights.length; i++) {
        const diff = Math.max(0, heights[i] - heights[i - 1]);
        const infInd = findInfInd(diff);
        if (infInd !== maxDiffs.length) {
            maxDiffs.splice(infInd, 0, diff);
            diffSum += maxDiffs.pop()!;
        } else {
            diffSum += diff;
        }
        if (diffSum > bricks) return i - 1;
    }
    return heights.length - 1;
}

function _furthestBuilding(heights: number[], bricks: number, ladders: number): number {
    function furthestBuildingEx(ind: number, bricks: number, ladders: number): number {
        if (bricks < 0 || ladders < 0) return ind - 1;
        if (ind === heights.length - 1) return heights.length - 1;
        if (heights[ind] >= heights[ind + 1]) {
            return furthestBuildingEx(ind + 1, bricks, ladders);
        } else {
            return Math.max(
                furthestBuildingEx(ind + 1, bricks - (heights[ind + 1] - heights[ind]), ladders),
                furthestBuildingEx(ind + 1, bricks, ladders - 1)
            );
        }
    }

    return furthestBuildingEx(0, bricks, ladders);
}
