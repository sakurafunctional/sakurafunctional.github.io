var plus = function(a, b)
{
  return a + b;
};

var reduce = function(array, f)
{
  var s;
  for (var n = 0; n < array.length; n++)
  {
    if (n == 0)
      s = array[0];
    else
      s = f(s, array[n]);
  }
  return s;
};

var range = function(n)
{
  var array = [];
  for (var i = 0; i < n; i++)
  {
    array[i] = i;
  }
  return array;
};

var after8 = reduce(range(10), plus);

console.log(after8);


var after9 = reduce(range(1000), plus);

console.log(after9);
