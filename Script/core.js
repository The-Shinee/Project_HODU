export class Stack {
    constructor() {
        this._arr = [];
    }

    push(item) {
        this._arr.push(item);
    }

    pop() {
        return this._arr.pop();
    }

    peek() {
        return this._arr[this._arr.length - 1];
    }

    isEmpty() {
        return this._arr.length === 0;
    }
}

export class Queue {
    constructor() {
        this._arr = [];
    }

    enqueue(item) {
        this._arr.push(item);
    }

    dequeue() {
        return this._arr.shift();
    }

    isEmpty() {
        return this._arr.length === 0;
    }
}