import assert from 'assert';

class SeatManager {
    private readonly availableSeats: number[] = [];

    constructor(n: number) {
        for (let i = n; i >= 1; i--) this.availableSeats.push(i);
    }

    private findInfInd(target: number): number {
        let start = 0;
        let end = this.availableSeats.length;
        while (start < end) {
            const mid = (start + end) >> 1;
            if (target >= this.availableSeats[mid]) end = mid;
            else start = mid + 1;
        }
        return start;
    }

    reserve(): number {
        return this.availableSeats.pop()!;
    }

    unreserve(seatNumber: number): void {
        const infInd = this.findInfInd(seatNumber);
        this.availableSeats.splice(infInd, 0, seatNumber);
    }
}

class _SeatManager {
    private readonly seats: number[] = [];

    constructor(n: number) {
        for (let i = n; i >= 1; i--) this.seats.push(i);
    }

    reserve(): number {
        return this.seats.pop()!;
    }

    private swap(i: number, j: number): void {
        const temp = this.seats[i];
        this.seats[i] = this.seats[j];
        this.seats[j] = temp;
    }

    unreserve(seatNumber: number): void {
        this.seats.push(seatNumber);
        for (let i = this.seats.length - 1; i >= 1; i--) {
            if (this.seats[i - 1] < this.seats[i]) {
                this.swap(i - 1, i);
            } else {
                break;
            }
        }
    }
}

//TODO
