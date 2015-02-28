var multiply = function(a, b)
{
  return a * b;
};

var s = [1, 2, 3, 4]
  .reduce(multiply);

console.log(s);
