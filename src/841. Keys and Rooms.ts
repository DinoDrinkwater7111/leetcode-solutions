import assert from 'assert';

function canVisitAllRooms(rooms: number[][]): boolean {

}

function _canVisitAllRooms(rooms: number[][]): boolean {
    const hasKey: boolean[] = Array(rooms.length).fill(false);
    hasKey[0] = true;
    let toVisitSet: null[] = [null];
    while (toVisitSet.length > 0) {
        const toVisitSet_: null[] = [];
        toVisitSet.forEach((_, roomInd) => {
            const keys = rooms[roomInd];
            for (const key of keys) {
                if (!hasKey[key]) toVisitSet_[key] = null;
                hasKey[key] = true;
            }
        });
        toVisitSet = toVisitSet_;
    }
    return hasKey.every((v) => v);
}

//TODO
