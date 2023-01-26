import assert from 'assert';

interface NestedInteger {
    isInteger(): boolean;
    getInteger(): number | null;
    setInteger(value: number): void;
    add(elem: NestedInteger): void;
    getList(): NestedInteger[];
}

class _NestedIterator {
    private readonly nums: number[] = [];

    constructor(nestedList: NestedInteger[]) {
        while (nestedList.length > 0) {
            const last = nestedList.pop()!;
            if (last.isInteger()) this.nums.push(last.getInteger()!);
            else nestedList.push(...last.getList());
        }
    }

    hasNext(): boolean {
        return this.nums.length > 0;
    }

    next(): number {
        return this.nums.pop()!;
    }
}

class NestedIterator {
    private readonly nestedList: NestedInteger[];

    constructor(nestedList: NestedInteger[]) {
        this.nestedList = nestedList;
        this.nestedList.reverse();
        this.extractLastToInteger();
    }

    private extractLastToInteger(): void {
        while (this.nestedList.length > 0) {
            const last = this.nestedList.pop()!;
            if (last.isInteger()) {
                this.nestedList.push(last);
                break;
            } else {
                this.nestedList.push(...last.getList().reverse());
            }
        }
    }

    hasNext(): boolean {
        return this.nestedList.length > 0;
    }

    next(): number {
        const result = this.nestedList.pop()!.getInteger()!;
        this.extractLastToInteger();
        return result;
    }
}

//TODO
