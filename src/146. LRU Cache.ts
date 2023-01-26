import assert from 'assert';

class DoubleLinkedNode {
    public next: DoubleLinkedNode | null = null;
    public previous: DoubleLinkedNode | null = null;
    constructor(public key: number, public val: number) {}
}

class LRUCache {
    private readonly key2Node = new Map<number, DoubleLinkedNode>();
    private readonly capacity: number;
    private readonly startNode: DoubleLinkedNode = new DoubleLinkedNode(
        Number.NEGATIVE_INFINITY,
        Number.NEGATIVE_INFINITY
    );
    private readonly endNode: DoubleLinkedNode = new DoubleLinkedNode(
        Number.POSITIVE_INFINITY,
        Number.POSITIVE_INFINITY
    );

    constructor(capacity: number) {
        this.capacity = capacity;
        this.startNode.next = this.endNode;
        this.endNode.previous = this.startNode;
    }

    get(key: number): number {
        let node = this.key2Node.get(key);
        if (node !== undefined) {
            this.moveNodeToEnd(node);
            return node.val;
        } else {
            return -1;
        }
    }

    put(key: number, value: number): void {
        let node = this.key2Node.get(key);
        if (node !== undefined) {
            this.moveNodeToEnd(node);
            node.val = value;
        } else {
            node = new DoubleLinkedNode(key, value);
            this.key2Node.set(key, node);
            this.endNode.previous!.next = node;
            node.previous = this.endNode.previous;
            this.endNode.previous = node;
            node.next = this.endNode;
            if (this.key2Node.size > this.capacity) {
                this.key2Node.delete(this.startNode.next!.key);
                this.startNode.next = this.startNode.next!.next;
                this.startNode.next!.previous = this.startNode;
            }
        }
    }

    private moveNodeToEnd(node: DoubleLinkedNode): void {
        node.previous!.next = node.next;
        node.next!.previous = node.previous;
        node.next = this.endNode;
        node.previous = this.endNode.previous;
        this.endNode.previous!.next = node;
        this.endNode.previous = node;
    }
}

const cahce = new LRUCache(2);
cahce.put(1, 1);
cahce.put(2, 2);
cahce.get(1);
cahce.put(3, 3);
cahce.get(2);
cahce.put(4, 4);
cahce.get(1);
cahce.get(3);
cahce.get(4);
