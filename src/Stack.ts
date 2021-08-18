export class Stack<Type> {
    private stack: Type[];
    private maxSize: number;

    constructor(maxSize: number) {
        this.stack = [];
        this.maxSize = maxSize;
    }

    public push(item: Type) {
        this.stack.push(item);
        if (this.size() > this.maxSize) {
            this.stack.shift();
        }
    }

    public pop() {
        this.stack.pop();
    }

    public peek() {
        return this.stack[this.size() - 1];
    }

    public get(i: number) {
        return this.stack[i];
    }

    public size() {
        return this.stack.length;
    }

    public toString() {
        return JSON.stringify(this.stack, null, 4);
    }

    public getArray() {
        return [...this.stack];
    }

    public isFull() {
        return this.size() === this.maxSize;
    }
}
