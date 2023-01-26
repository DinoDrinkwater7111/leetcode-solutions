import assert from 'assert';

class Trie {
    private readonly trieArr: Trie[] = Array(26);
    private readonly endHereSet = new Set<number>();

    constructor() {}

    insert(word: string): void {
        this._insert(word, 0);
    }

    public _insert(word: string, ind: number): void {
        if (ind < word.length) {
            const shiftedCharCode = word.charCodeAt(ind) - 97;
            if (this.trieArr[shiftedCharCode] === undefined) {
                this.trieArr[shiftedCharCode] = new Trie();
            }
            if (ind === word.length - 1) {
                this.endHereSet.add(shiftedCharCode);
            } else {
                this.trieArr[shiftedCharCode]._insert(word, ind + 1);
            }
        }
    }

    search(word: string): boolean {
        return this._search(word, 0);
    }

    public _search(word: string, ind: number): boolean {
        const shiftedCharCode = word.charCodeAt(ind) - 97;
        if (ind === word.length - 1) {
            return this.endHereSet.has(shiftedCharCode);
        } else {
            if (this.trieArr[shiftedCharCode] === undefined) {
                return false;
            } else {
                return this.trieArr[shiftedCharCode]._search(word, ind + 1);
            }
        }
    }

    startsWith(prefix: string): boolean {
        return this._startsWith(prefix, 0);
    }

    public _startsWith(word: string, ind: number): boolean {
        const shiftedCharCode = word.charCodeAt(ind) - 97;
        if (ind < word.length) {
            if (this.trieArr[shiftedCharCode] === undefined) {
                return false;
            } else {
                return this.trieArr[shiftedCharCode]._startsWith(word, ind + 1);
            }
        } else {
            return true;
        }
    }
}

class _Trie {
    private readonly words = new Set<string>();

    constructor() {}

    insert(word: string): void {
        this.words.add(word);
    }

    search(word: string): boolean {
        return this.words.has(word);
    }

    startsWith(prefix: string): boolean {
        for (const word of this.words) {
            if (word.startsWith(prefix)) return true;
        }
        return false;
    }
}

function test() {
    let words: string[] = [];
    const charPool = Array(26)
        .fill(undefined)
        .map((v, i) => String.fromCharCode(i + 97));
    try {
        words = Array(100)
            .fill(undefined)
            .map(() =>
                Array(Math.floor(Math.random() * 1000) + 1)
                    .fill(undefined)
                    .map(() => charPool[Math.floor(Math.random() * charPool.length)])
                    .join('')
            );
        const trie = new Trie();
        const _trie = new _Trie();
        for (let i = 0; i < 10000; i++) {
            const word4Insert = words[Math.floor(Math.random() * words.length)];
            const word4Search = words[Math.floor(Math.random() * words.length)];
            const word4Prefix = words[Math.floor(Math.random() * words.length)];
            const prefix = word4Prefix.substring(0, Math.floor(Math.random() * (words.length - 1)) + 1);
            trie.insert(word4Insert);
            _trie.insert(word4Insert);
            assert.strictEqual(trie.search(word4Search), _trie.search(word4Search), "search");
            assert.strictEqual(trie.startsWith(prefix), _trie.startsWith(prefix), "prefix");
        }
    } catch (e) {
        if (e instanceof assert.AssertionError) {
            console.log(words);
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
