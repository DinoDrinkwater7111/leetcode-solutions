import assert from 'assert';

const classes = [
    class RandomizedSet {
        private readonly vals: number[] = [];
        private readonly val2ind = new Map<number, number>();

        constructor() {}

        insert(val: number): boolean {
            if (this.val2ind.has(val)) return false;
            this.val2ind.set(val, this.vals.length);
            this.vals.push(val);
            return true;
        }

        remove(val: number): boolean {
            const ind = this.val2ind.get(val);
            if (ind === undefined) return false;
            this.vals[ind] = this.vals[this.vals.length - 1];
            this.vals.pop();
            this.val2ind.set(this.vals[ind], ind);
            this.val2ind.delete(val);
            return true;
        }

        getRandom(): number {
            const ind = Math.floor(Math.random() * this.vals.length);
            return this.vals[ind];
        }
    },
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
    },
];
