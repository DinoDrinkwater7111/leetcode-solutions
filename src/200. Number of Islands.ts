import assert from 'assert';

function numIslands(grid: string[][]): number {
    let result = 0;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === '1') {
                result++;
                let lands_i: number[] = [i];
                let lands_j: number[] = [j];
                while (lands_i.length > 0) {
                    const lands_i_: number[] = [];
                    const lands_j_: number[] = [];
                    for (let k = 0; k < lands_i.length; k++) {
                        const land_i = lands_i[k];
                        const land_j = lands_j[k];

                        if (grid[land_i]?.[land_j] === '1') grid[land_i][land_j] = '';
                        else continue;

                        lands_i_.push(land_i - 1);
                        lands_j_.push(land_j);

                        lands_i_.push(land_i + 1);
                        lands_j_.push(land_j);

                        lands_i_.push(land_i);
                        lands_j_.push(land_j - 1);

                        lands_i_.push(land_i);
                        lands_j_.push(land_j + 1);
                    }
                    lands_i = lands_i_;
                    lands_j = lands_j_;
                }
            }
        }
    }

    return result;
}

function _numIslands(grid: string[][]): number {}
