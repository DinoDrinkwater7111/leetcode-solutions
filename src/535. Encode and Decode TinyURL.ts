import assert from 'assert';

const cache: string[] = [];

function encode(longUrl: string): string {
    let index: number;
    do {
        index = Math.floor(Math.random() * 100000);
    } while (cache[index] !== undefined && cache[index] !== longUrl);
    cache[index] = longUrl;
    return `http://x.com/${index}`;
}

function decode(shortUrl: string): string {
    const index = Number(shortUrl.substring(13));
    return cache[index];
}

function test() {
    let longUrl: string = '';
    try {
        for (let n = 2; n <= 1000; n++) {
            longUrl = 'https://' + Math.random().toString();
            assert.equal(decode(encode(longUrl)), longUrl);
        }
    } catch (e) {
        console.log(longUrl);
        if (e instanceof assert.AssertionError) {
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
