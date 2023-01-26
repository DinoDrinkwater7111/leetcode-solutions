import assert from 'assert';

class MyCalendarThree {
    private readonly intervalStarts: number[] = [];
    private readonly intervalStart2overlap = new Map<number, number>();
    private max = 1;
    constructor() {}

    private findSupInd(target: number): number {
        let start = 0;
        let end = this.intervalStarts.length;
        while (start < end) {
            const mid = (start + end) >> 1;
            if (target <= this.intervalStarts[mid]) end = mid;
            else start = mid + 1;
        }
        return start;
    }

    private addStart(start: number): number {
        const supInd = this.findSupInd(start);
        if (this.intervalStart2overlap.get(start) === undefined) {
            this.intervalStarts.splice(supInd, 0, start);
            const inf = this.intervalStarts[supInd - 1] ?? Number.NaN;
            const overlap = this.intervalStart2overlap.get(inf) ?? 0;
            this.intervalStart2overlap.set(start, overlap);
        }
        return supInd;
    }

    book(start: number, end: number): number {
        this.addStart(end);
        const startInd = this.addStart(start);
        console.log(this.intervalStarts);
        for (let i = startInd; i < this.intervalStarts.length; i++) {
            const intervalStart = this.intervalStarts[i];
            const overlap = this.intervalStart2overlap.get(intervalStart)!;
            if (end <= intervalStart) break;
            console.log([intervalStart, overlap]);
            this.intervalStart2overlap.set(intervalStart, overlap + 1);
            this.max = Math.max(this.max, overlap + 1);
        }
        return this.max;
    }
}

class _MyCalendarThree {
    private readonly intervalStart2overlap: number[] = [];
    private max = 1;
    constructor() {}

    private addStart(start: number): void {
        if (this.intervalStart2overlap[start] === undefined) {
            let overlap = 0;
            for (const key in this.intervalStart2overlap) {
                const intervalStart = Number(key);
                const _overlap = this.intervalStart2overlap[key];
                if (intervalStart > start) break;
                overlap = _overlap;
            }
            this.intervalStart2overlap[start] = overlap;
        }
    }

    book(start: number, end: number): number {
        this.addStart(start);
        this.addStart(end);
        for (const key in this.intervalStart2overlap) {
            const intervalStart = Number(key);
            const overlap = this.intervalStart2overlap[key];
            if (end <= intervalStart) break;
            if (start <= intervalStart) {
                this.intervalStart2overlap[intervalStart]++;
                this.max = Math.max(this.max, overlap + 1);
            }
        }
        return this.max;
    }
}

//TODO
