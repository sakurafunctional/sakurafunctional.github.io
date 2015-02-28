var increment = function(x)
{
  return x + 1;
};

var double = function(x)
{
  return x * 2;
};

var increment_double = function(x)
{
  return double(increment(x)); 　// (x + 1) * 2
};
var after6 = increment_double(5);
console.log(after6);
