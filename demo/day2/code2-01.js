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

        console.info('-----------------');
        console.info('n=', n);
        console.info('array[n]=', array[n]);
        console.info('s=', s);
  }
  return s;
};

var after1 = reduce([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], plus);

console.log(after1);
