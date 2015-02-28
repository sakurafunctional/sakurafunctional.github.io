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
