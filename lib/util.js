export function runFnWithCatch(fn, ...args) {
    try {
        fn(...args);
    }
    catch (e) {
        console.error(e);
    }
}
