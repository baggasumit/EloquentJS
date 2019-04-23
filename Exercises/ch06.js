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

// console.log(new Vec(1, 2).plus(new Vec(2, 3)));
// → Vec{x: 3, y: 5}
// console.log(new Vec(1, 2).minus(new Vec(2, 3)));
// → Vec{x: -1, y: -1}
// console.log(new Vec(3, 4).length);
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
// console.log(group.see());
// console.log(group.has(10));
// → true
// console.log(group.has(30));
// → false
group.add(10);
group.delete(10);
// console.log(group.has(10));
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

// for (let value of Group.from(["a", "b", "c"])) {
//   console.log(value);
// }

// hasOwnProperty

let map = { one: true, two: true, hasOwnProperty: true };

// Fix this call
// console.log(map.hasOwnProperty("one"));
// console.log(Object.prototype.hasOwnProperty.call(map, "two"));
// → true

function normalize() {
  // console.log('This', Object.keys(this).length);
  // let normalizedCoords = [1, 1, 1];
  const normalizedCoords = this.coords.map((n) => {
    console.log('This', Object.keys(this).length);
    return n / this.length;
  });
  return normalizedCoords;
}
// console.log('This', Object.keys(this).length);

global.coords = [0, 1, 2];
global.length = 10;
// console.log(normalize.call({ coords: [0, 1, 2, 3], length: 4 }));
// console.log(normalize());

class Group2 {
  constructor() {
    this.group = [];
  }

  add(item) {
    if (this.has(item)) {
      return false;
    } else {
      this.group.push(item);
      return true;
    }
  }

  delete(item) {
    const itemIndex = this.group.indexOf(item);
    if (itemIndex >= 0) {
      this.group.splice(itemIndex, 1);
      return true;
    }
    return false;
  }

  has(item) {
    return this.group.includes(item);
  }

  static from(itr) {
    for (let item of itr) {
      this.add(item);
    }
  }

  [Symbol.iterator]() {
    return new GroupIterator2(this.group);
    // this.curr = 0;
    // return {
    //   next: () => {
    //     if (this.curr >= this.group.length) {
    //       return { value: undefined, done: true };
    //     }
    //     const returnObj = { value: this.group[this.curr], done: false };
    //     this.curr++;
    //     return returnObj;
    //   },
    // };
  }
}

class GroupIterator2 {
  constructor(members) {
    this.members = members;
    this.curr = 0;
  }

  next() {
    if (this.curr >= this.members.length) {
      return { done: true };
    }
    const result = { value: this.members[this.curr], done: false };
    this.curr++;
    return result;
  }
}

const g = new Group2();
g.add(1);
g.add(2);
g.add(22);
console.log(g.has(33));
console.log(g.has(2));
g.delete(2);
console.log(g.group);
let itr = g[Symbol.iterator]();
console.log(itr);
// console.log(itr.next());
// console.log(itr.next());
// console.log(itr.next());
for (let i of g) {
  console.log(i);
}
let asdf;
