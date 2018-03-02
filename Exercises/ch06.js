// Your code here.
class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  plus(vec) {
    return new Vec(this.x + vec.x, this.y + vec.y);
  }

  minus(vec) {
    return new Vec(this.x - vec.x, this.y - vec.y);
  }

  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
}

console.log(new Vec(1, 2).plus(new Vec(2, 3)));
// → Vec{x: 3, y: 5}
console.log(new Vec(1, 2).minus(new Vec(2, 3)));
// → Vec{x: -1, y: -1}
console.log(new Vec(3, 4).length);
// → 5

class Group {
  constructor() {
    this.group = [];
  }

  see() {
    return this.group;
  }
  add(value) {
    if (!this.has(value)) {
      this.group.push(value);
    }
  }

  delete(value) {
    const index = this.group.indexOf(value);
    if (index >= 0) {
      this.group.splice(index, 1);
    }
  }

  has(value) {
    return this.group.includes(value);
  }

  static from(iter) {
    const group = new Group();
    for (let item of iter) {
      group.add(item);
    }
    return group;
  }
}

let group = Group.from([10, 20]);
console.log(group.see());
console.log(group.has(10));
// → true
console.log(group.has(30));
// → false
group.add(10);
group.delete(10);
console.log(group.has(10));
// → false

class GroupIterator {
  constructor(group) {
    this.currIndex = 0;
    this.group = group;
  }

  next() {
    if (this.currIndex === this.group.group.length) return { done: true };
    const value = this.group.group[this.currIndex];
    this.currIndex += 1;
    return { value, done: false };
  }
}

Group.prototype[Symbol.iterator] = function() {
  return new GroupIterator(this);
};

for (let value of Group.from(["a", "b", "c"])) {
  console.log(value);
}

// hasOwnProperty

let map = { one: true, two: true, hasOwnProperty: true };

// Fix this call
// console.log(map.hasOwnProperty("one"));
console.log(Object.prototype.hasOwnProperty.call(map, "two"));
// → true
