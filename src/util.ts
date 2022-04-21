export function runFnWithCatch(fn: (...args: any) => unknown, ...args: any) {
  try {
    fn(...args)
  } catch (e) {
    console.error(e)
  }
}