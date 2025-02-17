export const debounce = (fn: (...args: any) => any, ms: number) => {
  let timer: ReturnType<typeof setTimeout> | undefined;

  const debouncedFn = (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = undefined;
      fn(...args);
    }, ms);
  };

  debouncedFn.cancel = () => {
    if (timer) {
      clearTimeout(timer);
      timer = undefined;
    }
  };

  return debouncedFn;
}
