declare module '@datastructures-js/priority-queue' {
    class PriorityQueue {
        constructor(options?: { priority: (el: any) => number }) {}

        size(): number {}

        isEmpty(): boolean {}

        /**
         * returns the element with highest priority in the queue
         */
        front(): any {}

        /**
         * returns the element with lowest priority in the queue
         */
        back(): any {}

        /**
         * add an element to the queue based on its priority
         * @throws {Error} if priority is not a valid number || missing constructor callback
         */
        enqueue(element: any, priority?: number) {}

        /**
         * removes and returns the element with highest priority in the queue
         */
        dequeue(): any {}

        /**
         * returns an sorted list of elements from highest priority to lowest
         */
        toArray(): any[] {}

        /**
         * clears the queue
         */
        clear(): void {}
    }

    declare class MinPriorityQueue extends PriorityQueue {}
    declare class MaxPriorityQueue extends PriorityQueue {}
}
