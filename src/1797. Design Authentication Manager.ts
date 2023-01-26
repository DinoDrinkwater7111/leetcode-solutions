import assert from 'assert';

class AuthenticationManager {
    private readonly timeToLive: number;
    private readonly tokenId2exprieTime = new Map<string, number>();

    constructor(timeToLive: number) {
        this.timeToLive = timeToLive;
    }

    generate(tokenId: string, currentTime: number): void {
        this.tokenId2exprieTime.set(tokenId, currentTime + this.timeToLive);
    }

    renew(tokenId: string, currentTime: number): void {
        const expireTime = this.tokenId2exprieTime.get(tokenId);
        if (expireTime !== undefined && expireTime > currentTime) {
            this.tokenId2exprieTime.set(tokenId, currentTime + this.timeToLive);
        }
    }

    countUnexpiredTokens(currentTime: number): number {
        let count = 0;
        this.tokenId2exprieTime.forEach((exprieTime) => {
            if (exprieTime > currentTime) count++;
        });
        return count;
    }
}
