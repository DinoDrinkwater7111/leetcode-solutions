import assert from 'assert';

interface Iterator {
    hasNext(): boolean;

    next(): number;
}

class PeekingIterator {
    private buffer: number | undefined = undefined;
    private readonly iterator: Iterator;
    constructor(iterator: Iterator) {
        this.iterator = iterator;
    }

    peek(): number {
        if (this.buffer === undefined) {
            this.buffer = this.iterator.next();
        }
        return this.buffer;
    }

    next(): number {
        if (this.buffer !== undefined) {
            const temp = this.buffer;
            this.buffer = undefined;
            return temp;
        } else {
            return this.iterator.next();
        }
    }

    hasNext(): boolean {
        if (this.buffer !== undefined) return true;
        else return this.iterator.hasNext();
    }
}
