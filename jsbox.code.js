/*
 * @Author: chenzhongsheng
 * @Date: 2023-03-22 09:28:56
 * @Description: Coding something
 */
window.jsboxCode = {
    lib: 'https://cdn.jsdelivr.net/npm/tc-signal',
    lang: 'javascript',
    code: `var {signal, computed, effect} = window.TcSignal;
const count = signal(1);
const doubleCount = computed(() => count.get() * 2);

effect(() => {
    console.log(\`Count is: \${count.get()}\`);
}); // Console: Count is: 1

console.log('doubleCount = ', doubleCount.get()); // 2

count.set(2); // Console: Count is: 2

console.log('doubleCount = ', doubleCount.get()); // 4`
};