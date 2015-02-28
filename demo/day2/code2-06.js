var increment = function(x)
{
  return x + 1;
};

var double = function(x)
{
  return x * 2;
};

var double_increment = function(x)
{
  return increment(double(x));　// (x * 2) + 1
};

var after5 = double_increment(5);

console.log(after5);
