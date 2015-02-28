var increment = function(x)
{
  return x + 1;
};

var double = function(x)
{
  return x * 2;
};

var f = increment;
var g = double;

var fg = function(x) // (x + 1) * 2
  {
    return g(f(x));
  };

var gf = function(x) // (x * 2) + 1
  {
    return f(g(x));
  };

var ff = function(x) // (x + 1) + 1
  {
    return f(f(x));
  };

var gg = function(x) // (x * 2) * 2
  {
    return g(g(x));
  };
  
  console.log(f(5)); // 5+1 = 6
  console.log(g(5)); // 5*2 = 10
  console.log(fg(5)); // (5+1)*2 = 12
  console.log(gf(5)); // (5*2)+1 = 11
  console.log(ff(5)); // (5+1)+1 = 7
  console.log(gg(5)); // (5*2)*2 = 20
