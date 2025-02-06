export function all(...args: any[]) {
  for (const arg of args) {
    if (!arg) {
      return false;
    }
  }
  return true;
}

export function any(...args: any[]) {
  for (const arg of args) {
    if (arg) {
      return true;
    }
  }
  return false;
}

export function empty(arr: Array<any> | undefined) {
  return !arr || arr.length === 0;
}
