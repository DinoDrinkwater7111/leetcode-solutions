import assert from 'assert';

class TimeMap {
    private readonly key2valuesTimestamps = new Map<string, [string[], number[]]>();
    constructor() {}

    set(key: string, value: string, timestamp: number): void {
        const valuesTimestamps = this.key2valuesTimestamps.get(key) ?? [[], []];
        valuesTimestamps[0].push(value);
        valuesTimestamps[1].push(timestamp);
        this.key2valuesTimestamps.set(key, valuesTimestamps);
    }

    get(key: string, timestamp: number): string {
        const [values, timestamps] = this.key2valuesTimestamps.get(key) ?? [[], []];
        let start = -1;
        let end = timestamps.length - 1;
        while (start < end) {
            const mid = Math.ceil((start + end) / 2);
            if (timestamps[mid] <= timestamp) start = mid;
            else end = mid - 1;
        }
        if (start === -1) return '';
        else return values[start];
    }
}
