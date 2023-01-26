import assert from 'assert';

function getHint(secret: string, guess: string): string {
    let bulls = 0;
    for (let i = 0; i < secret.length; i++) if (secret[i] === guess[i]) bulls++;

    const digit2count: number[] = Array(10).fill(0);
    for (let i = 0; i < secret.length; i++) digit2count[secret.charCodeAt(i) - 48]++;
    let _cows = 0;
    for (let i = 0; i < guess.length; i++) {
        const digit = guess.charCodeAt(i) - 48;
        if (digit2count[digit] > 0) {
            _cows++;
            digit2count[digit]--;
        }
    }
    const cows = _cows - bulls;
    return `${bulls}A${cows}B`;
}

function getHint(secret: string, guess: string): string {}

//TODO