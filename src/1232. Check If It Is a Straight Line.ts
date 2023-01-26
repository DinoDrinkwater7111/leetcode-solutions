import assert from "assert";

function checkStraightLine(coordinates: number[][]): boolean {
    const xd = coordinates[1][0] - coordinates[0][0];
    const yd = coordinates[1][1] - coordinates[0][1];
    for (let i = 2; i < coordinates.length; i++) {
        const xd2 = coordinates[i][0] - coordinates[i - 1][0];
        const yd2 = coordinates[i][1] - coordinates[i - 1][1];
        if (yd * xd2 !== yd2 * xd) return false;
    }
    return true;
}

//TODO
