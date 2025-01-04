/*
 * @Author: chenzhongsheng
 * @Date: 2025-01-02 17:07:45
 * @Description: Coding something
 */

import type {Computed} from './computed';
import type {Signal} from './signal';

export type IWatchTarget = ((
    computed: Computed<any> | Signal<any>
) => void);

const watchTargets: IWatchTarget[] = [];

export function execWatchTarget (target: IWatchTarget, trigger: ()=>void) {
    watchTargets.push(target);
    trigger();
    watchTargets.pop();
}

export function getWatchTarget () {
    return watchTargets[watchTargets.length - 1];
}