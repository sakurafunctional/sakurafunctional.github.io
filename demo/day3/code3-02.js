var __ = require('immutable');

var __natural = __.Range(); //「自然数」という無限数列

var __narural10 = __natural.take(10);

console.log(__narural10.toArray());
