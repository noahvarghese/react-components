export default class Stack<T> {
    private stack: T[];

    get length(): number {
        return this.stack.length;
    }

    public constructor(data?: T[]) {
        this.stack = data ?? [];
    }

    public push(data: T): number {
        return this.stack.push(data);
    }

    public pop(): T | undefined {
        return this.stack.pop();
    }

    public peek(): T | undefined {
        return this.stack[this.stack.length - 1];
    }
}
