<!--
 * @Author: theajack
 * @Date: 2023-05-09 22:31:06
 * @Description: Coding something
-->
# [Easy Signal Lib](https://github.com/theajack/signal)

### [Demo](https://shiyix.cn/jsbox/?github=theajack.signal)

- Only 75B with gzip, 3kb with min.js
- Support `computed`, `signal`, `effect`, `watch`

```
npm i tc-signal
```

```js
import {signal, computed, effect} from 'tc-signal';

const count = signal(1);
const doubleCount = computed(() => count.get() * 2);

effect(() => {
    console.log(`Count is: ${count.get()}`);
}); // Console: Count is: 1

console.log('doubleCount = ', doubleCount.get()); // 2

count.set(2); // Console: Count is: 2

console.log('doubleCount = ', doubleCount.get()); // 4
```

[All typings](https://unpkg.com/tc-signal/tc-signal.es.min.d.ts)
