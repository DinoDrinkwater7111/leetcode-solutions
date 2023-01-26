import assert from 'assert';

class RandomizedSet {
    private readonly vals = new Set<number>();

    constructor() {}

    insert(val: number): boolean {
        if (this.vals.has(val)) return false;
        this.vals.add(val);
        return true;
    }

    remove(val: number): boolean {
        return this.vals.delete(val);
    }

    getRandom(): number {
        const target = Math.floor(Math.random() * this.vals.size);
        let i = 0;
        for (const val of this.vals.values()) {
            if (i === target) return val;
            i++;
        }
        throw new Error();
    }
}

//TODO
