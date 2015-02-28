var __ = require('immutable');

var plus = function(a,b){return a + b;};

console.log(
__
.Range()
.take(10)
.reduce(plus)
);
