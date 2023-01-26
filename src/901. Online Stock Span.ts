import assert from 'assert';

class StockSpanner {
    readonly prices: number[] = [];
    readonly results: number[] = [];
    constructor() {}

    next(price: number): number {
        let currInd = this.prices.length - 1;
        let result = 1;
        while (currInd >= 0) {
            if (this.prices[currInd] > price) {
                break;
            } else {
                result += this.results.pop()!;
                this.prices.pop();
                currInd--;
            }
        }
        this.prices.push(price);
        this.results.push(result);
        return result;
    }
}

class _StockSpanner {
    readonly prices: number[] = [];
    readonly results: number[] = [];
    constructor() {}

    next(price: number): number {
        let currInd = this.prices.length - 1;
        let result = 1;
        while (currInd >= 0) {
            if (this.prices[currInd] > price) {
                break;
            } else {
                result += this.results[currInd];
                currInd -= this.results[currInd];
            }
        }
        this.prices.push(price);
        this.results.push(result);
        return result;
    }
}
