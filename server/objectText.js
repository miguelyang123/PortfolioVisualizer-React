let obj = [];
let obj2 = { t: 1, a: 2 };
let obj3 = { t: 2, a: 5 };

let n = "p #1";

obj.push(obj2);
obj.push(obj3);

let bigObj = { name: n, a: obj };

console.log(bigObj);
