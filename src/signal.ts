/*
 * @Author: chenzhongsheng
 * @Date: 2024-12-13 14:32:56
 * @Description: Coding something
 */

import {getWatchTarget} from './global';

export class Signal<T> {

    __isSignal = true;

    private _value: T;

    get () {
        getWatchTarget()?.(this);
        return this._value;
    }
    set (v: T) {
        const oldValue = this._value;
        this._value = v;
        this._listeners.forEach(fn => {fn(v, oldValue);});
    }
    private _listeners: ((v: T, n: T)=>void)[] = [];

    constructor (v: T) {
        this._value = v;
    }

    sub (fn: (v: T, old: T)=>void) {
        this._listeners.push(fn);
        return () => this.unsub(fn);
    }

    unsub (fn: (v: T, old: T)=>void) {
        const index = this._listeners.indexOf(fn);
        if (index !== -1) {
            this._listeners.splice(index, 1);
            return true;
        }
        return false;
    }

    destroy () {
        this._listeners = [];
    }
}
export function isSignal (v: any): v is Signal<any> {
    return !!v?.__isSignal;
}
export function signal<T> (v: T) {
    return new Signal(v);
}