"use strict";
var __spreadArrays =
    (this && this.__spreadArrays) ||
    function () {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };
exports.__esModule = true;
var Stack = /** @class */ (function () {
    function Stack(maxSize) {
        this.stack = [];
        this.maxSize = maxSize;
    }
    Stack.prototype.push = function (item) {
        this.stack.push(item);
        if (this.size() > this.maxSize) {
            this.stack.shift();
        }
    };
    Stack.prototype.pop = function () {
        this.stack.pop();
    };
    Stack.prototype.peek = function () {
        if (this.size() === 0) {
            throw new Error("Out of bounds");
        }
        return this.stack[this.size() - 1];
    };
    Stack.prototype.get = function (i) {
        return this.stack[i];
    };
    Stack.prototype.size = function () {
        return this.stack.length;
    };
    Stack.prototype.toString = function () {
        return JSON.stringify(this.stack, null, 4);
    };
    Stack.prototype.getArray = function () {
        return __spreadArrays(this.stack);
    };
    Stack.prototype.isFull = function () {
        return this.size() === this.maxSize;
    };
    return Stack;
})();
exports.Stack = Stack;
