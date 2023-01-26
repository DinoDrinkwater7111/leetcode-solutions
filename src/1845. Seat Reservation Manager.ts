import assert from 'assert';

class SeatManager {
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
