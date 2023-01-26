import assert from 'assert';

class ParkingSystem {
    private readonly capacities: [undefined, number, number, number] = [undefined, 0, 0, 0];

    constructor(big: number, medium: number, small: number) {
        this.capacities[1] = big;
        this.capacities[2] = medium;
        this.capacities[3] = small;
    }

    addCar(carType: number): boolean {
        return this.capacities[carType]!-- > 0;
    }
}

//TODO