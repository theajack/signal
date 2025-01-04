/*
 * @Author: chenzhongsheng
 * @Date: 2024-12-13 14:32:56
 * @Description: Coding something
 */

import {execWatchTarget, getWatchTarget} from './global';
import {type Signal} from './signal';

export type IReactiveLike<T=any> = IReactive<T> | T;
export type IReactive<T=any> = IComputedLike<T> | Signal<T>;

export type IComputedLike<T=any> = IComputeFn<T> | Computed<T>;

export type IComputeFn<T> = ()=>T;

export class Computed<T> {

    __isComputed = true;
    private _value: T;

    private _compute: IComputeFn<T>;
    private _dirty = true;

    private _set?: (v: T)=>void;

    private __itd = false;

    get () {
        if (this._dirty) {
            this._refreshValue();
        }
        getWatchTarget()?.(this);
        return this._value;
    }
    set (v: T) {
        if (!this._set) {
            console.warn('Computed not have set property');
            return;
        }
        this._set(v);
    }

    private _listeners: ((v: T, n: T)=>void)[] = [];

    private _clearSub: (()=>void)[] = [];
    constructor (get: IComputeFn<T>, set?: (v: T)=>void) {
        this._compute = get;
        this._set = set;
    }

    private _init () {
        execWatchTarget((target) => {
            const handler = () => {
                this._dirty = true;
                if (this._listeners.length > 0) {
                    const old = this._value;
                    const newValue = this.get();
                    this._listeners.forEach(fn => {
                        fn(newValue, old);
                    });
                }
            };
            const clear = target.sub(handler);
                
            this._clearSub.push(clear);
        }, () => {this._refreshValue();});
    }

    private _refreshValue () {
        if (!this.__itd) {
            this.__itd = true;
            this._init();
            return;
        }
        this._value = this._compute();
        this._dirty = false;
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
        this._clearSub.forEach(fn => fn());
        this._clearSub = [];
    }
}

export function computed<T> (v: IComputedLike<T>, set?: (v: T)=>void) {
    if (isComputed(v)) return v;
    return new Computed(v, set);
}

export function isComputed (v: any): v is Computed<any> {
    return !!v?.__isComputed;
}

export function isComputedLike (v: any): v is IComputedLike<any> {
    return typeof v === 'function' || isComputed(v);
}
