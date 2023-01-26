import assert from 'assert';

class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = val === undefined ? 0 : val;
        this.next = next === undefined ? null : next;
    }
}

function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
    if (lists.length === 0) return null;
    if (lists.length === 1) return lists[0];

    /**binary search , suppoer indArr.length > 0*/
    function findInfInd(target: number, indArr: number[], start: number, end: number): number {
        if (end === start) {
            if (lists[indArr[start]]!.val < target) {
                return start;
            } else {
                return start - 1;
            }
        }
        if (target < lists[indArr[start]]!.val) return start - 1;

        const middleInd = Math.floor((start + end) / 2);
        if (lists[indArr[middleInd]]!.val < target) {
            return findInfInd(target, indArr, middleInd + 1, end);
        } else {
            return findInfInd(target, indArr, start, middleInd);
        }
    }

    const result = new ListNode();
    let currentResultNode = result;
    let minCandidateArr: number[] = [];
    for (let i = 0; i < lists.length; i++) {
        if (lists[i] !== null) {
            minCandidateArr.push(i);
        }
    }
    minCandidateArr.sort((a, b) => lists[a]!.val - lists[b]!.val);
    while (true) {
        const minInd = minCandidateArr.shift();
        if (minInd === undefined) break;
        currentResultNode.next = lists[minInd]!;
        currentResultNode = currentResultNode.next;
        lists[minInd] = lists[minInd]!.next;
        if (lists[minInd] !== null) {
            if (minCandidateArr.length > 0) {
                const insertInd = findInfInd(lists[minInd]!.val, minCandidateArr, 0, minCandidateArr.length - 1);
                if (insertInd === -1) {
                    minCandidateArr.unshift(minInd);
                } else {
                    minCandidateArr.splice(insertInd + 1, 0, minInd);
                }
            } else {
                minCandidateArr.push(minInd);
            }
        }
    }
    return result.next;
}

function list2Arr(listNode: ListNode | null): number[] {
    const result: number[] = [];
    let currentNode = listNode;
    while (currentNode !== null) {
        result.push(currentNode.val);
        currentNode = currentNode.next;
    }
    return result;
}

function arr2list(nums: number[]): ListNode | null {
    if (nums.length === 0) return null;
    const resultPrev = new ListNode();
    let currentNode = resultPrev;
    for (const num of nums) {
        currentNode.next = new ListNode(num);
        currentNode = currentNode.next;
    }
    return resultPrev.next;
}

function _mergeKLists(lists: Array<ListNode | null>): ListNode | null {
    const resultArr: number[] = [];
    for (const list of lists) {
        resultArr.push(...list2Arr(list));
    }
    return arr2list(resultArr.sort((a, b) => a - b));
}

function test() {
    let numsArr: number[][] = [];
    try {
        for (let n = 0; n < 100; n++) {
            numsArr = [];
            for (let i = 0; i < 100; i++) {
                numsArr[i] = Array(Math.floor(Math.random() * 100))
                    .fill(undefined)
                    .map(() => Math.floor(Math.random() * 1000))
                    .sort((a, b) => a - b);
            }
            assert.deepStrictEqual(
                list2Arr(mergeKLists(numsArr.map((nums) => arr2list(nums)))),
                list2Arr(_mergeKLists(numsArr.map((nums) => arr2list(nums))))
            );
        }
    } catch (e) {
        if (e instanceof assert.AssertionError) {
            console.log(numsArr);
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
