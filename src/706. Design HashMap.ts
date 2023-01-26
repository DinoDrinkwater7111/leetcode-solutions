import assert from 'assert';

class MyHashMap {
    private readonly keyArr: number[] = [];
    private readonly valArr: number[] = [];

    constructor() {}

    private findKeySupInd(target: number): number {
        let start = 0;
        let end = this.keyArr.length;
        while (start < end) {
            const mid = (start + end) >> 1;
            if (target <= this.keyArr[mid]) end = mid;
            else start = mid + 1;
        }
        return start;
    }

    put(key: number, value: number): void {
        const ind = this.findKeySupInd(key);
        if (this.keyArr[ind] === key) {
            this.valArr[ind] = value;
        } else {
            this.keyArr.splice(ind, 0, key);
            this.valArr.splice(ind, 0, value);
        }
    }

    remove(key: number): void {
        const ind = this.findKeySupInd(key);
        if (this.keyArr[ind] === key) {
            this.keyArr.splice(ind, 1);
            this.valArr.splice(ind, 1);
        }
    }

    get(key: number): number {
        const ind = this.findKeySupInd(key);
        return this.keyArr[ind] === key ? this.valArr[ind] : -1;
    }
}

//TODO