/*
 * @Author: chenzhongsheng
 * @Date: 2025-01-02 17:06:57
 * @Description: Coding something
 */
import {isComputedLike, type IComputedLike, computed, IComputeFn} from './computed';
import {execWatchTarget} from './global';
import {isSignal, type Signal} from './signal';


export function watch<T> (v: IComputedLike<T>|Signal<T>, fn: (v: T, old: T)=>void): ()=>void {
    if (isSignal(v)) {
        return v.sub(fn);
    }
    if (isComputedLike(v)) {
        return computed(v).sub(fn);
    }
    return () => {};
}

export function effect<T=void> (fn: IComputeFn<T>): ()=>void {
    const clearSub: (()=>void)[] = [];
    execWatchTarget((v) => {clearSub.push(v.sub(fn));}, fn);
    return () => { clearSub.forEach(v => v()); };
}