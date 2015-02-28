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

var out = function(n)
{
  console.info('value:', n);
  return n;
};

var after10 = map(range(10), out);

console.log(after10);
