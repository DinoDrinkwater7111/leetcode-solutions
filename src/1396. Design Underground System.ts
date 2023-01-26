import assert from 'assert';

class UndergroundSystem {
    private readonly startEndStr2avgTime_size = new Map<string, [number, number]>();
    private readonly id2start_startTime = new Map<number, [string, number]>();

    constructor() {}

    checkIn(id: number, stationName: string, t: number): void {
        this.id2start_startTime.set(id, [stationName, t]);
    }

    checkOut(id: number, stationName: string, t: number): void {
        const [start, startTime] = this.id2start_startTime.get(id)!;
        const startEndStr = `${start}-${stationName}`;
        let avgTime_size = this.startEndStr2avgTime_size.get(startEndStr);
        if (avgTime_size === undefined) {
            avgTime_size = [0, 0];
        }
        const [avgTime, size] = avgTime_size;
        const totalTime = avgTime * size + t - startTime;
        const size_ = size + 1;
        const avgTime_ = totalTime / size_;
        this.startEndStr2avgTime_size.set(startEndStr, [avgTime_, size_]);
    }

    getAverageTime(startStation: string, endStation: string): number {
        const startEndStr = this.getStartEndStr(startStation, endStation);
        const [avgTime] = this.startEndStr2avgTime_size.get(startEndStr)!;
        return avgTime;
    }

    private getStartEndStr(startStation: string, endStation: string): string {
        return `${startStation}-${endStation}`;
    }
}
