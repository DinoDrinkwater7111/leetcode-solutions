import assert from 'assert';

class MyCalendar {
    private readonly starts: number[] = [];
    private readonly ends: number[] = [];

    constructor() {}

    book(start: number, end: number): boolean {
        const supInd = MyCalendar.findSupInd(this.ends, end);
        let canBook = end <= (this.starts[supInd] ?? Number.POSITIVE_INFINITY);
        canBook &&= (this.ends[supInd - 1] ?? Number.NEGATIVE_INFINITY) <= start;
        if (canBook) {
            this.starts.splice(supInd, 0, start);
            this.ends.splice(supInd, 0, end);
            return true;
        } else {
            return false;
        }
    }

    private static findSupInd(arr: number[], target: number): number {
        let l = 0;
        let r = arr.length;
        while (l < r) {
            const mid = (l + r) >> 1;
            if (target <= arr[mid]) r = mid;
            else l = mid + 1;
        }
        return l;
    }
}

//TODO