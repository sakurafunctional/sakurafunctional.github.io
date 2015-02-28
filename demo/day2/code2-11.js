var range = function(n)
{
  var array = [];
  for (var i = 0; i < n; i++)
  {
    array[i] = i;
  }
  return array;
};

var map = function(array, f)
{
  var array1 = [];
  for (var n = 0; n < array.length; n++)
  {
    array1[n] = f(array[n]);
  }
  return array1;
};

var even = function(x)
{
  return x * 2 + 1;
};

var after7 = map(range(10), even);

console.log(after7);
