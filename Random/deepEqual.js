function deepEqual2(x, y) {
  if (x === y) return true;
  if (typeof x !== typeof y) return false;
  if (
    typeof x === 'object' &&
    x !== null &&
    typeof y === 'object' &&
    y !== null
  ) {
    const xKeys = Object.keys(x);
    const yKeys = Object.keys(y);
    if (xKeys.length !== yKeys.length) return false;
    for (let key of xKeys) {
      if (!deepEqual(x[key], y[key])) return false;
    }
    return true;
  }
  return false;
}

function deepEqual(obj1, obj2) {
  if (
    typeof obj1 !== 'object' ||
    typeof obj2 !== 'object' ||
    obj1 === null ||
    obj2 === null
  ) {
    return obj1 === obj2;
  }

  const obj1Keys = Object.keys(obj1);
  const obj2keys = Object.keys(obj2);
  if (obj1Keys.length !== obj2keys.length) return false;

  return obj1Keys.every((key) => {
    if (!obj2keys.includes(key)) return false;
    return deepEqual(obj1[key], obj2[key]);
  });
}

const obj1 = { a: 1, b: { c: [1, 2, 3], d: 'roman' } };
const obj2 = { b: { d: 'roman', c: [1, 2, 3] }, a: 1 };
const a = null;
const b = {};

console.log(deepEqual(obj1, obj2));
console.log(deepEqual(a, b));
