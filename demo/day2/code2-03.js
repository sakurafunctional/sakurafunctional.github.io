var map = function(array, f)
{
  var array1 = [];
  for (var n = 0; n < array.length; n++)
  {
    array1[n] = f(array[n]);
  }
  return array1;
};
