var map = function(array, f)
{
  var array1 = [];
  for (var n = 0; n < array.length; n++)
  {
    array1[n] = f(array[n]);

    console.info('-----------------');
    console.info('n=', n);
    console.info('array[n]  =', array[n]);
    console.info('array1[n] =', array1[n]);
    console.info('array1    =', array1);
  }
  return array1;
};

var double = function(x)
{
  return x * 2;
};

var after3 = map([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], double);

console.log(after3);
