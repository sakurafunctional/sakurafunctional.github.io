var _ = require('lodash');
var __ = require('immutable');

var __natural = __.Range();

var fibF = _.memoize(function(n) {
  return n <= 1 ? 1 : fibF(n - 2) + fibF(n - 1);
});

var __fib = __natural.map(fibF);
var __fib100 = __fib.take(100);

console.log(__fib100.toArray()); //calculate and output
