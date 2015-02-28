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


var compose = function(f, g)
{
  var fg = function(x)
  {
    return g(f(x));
  };

  return fg;
};

var fg = compose(f, g);
var gf = compose(g, f);
var ff = compose(f, f);
var gg = compose(g, g);

console.log(f(5)); // 5+1 = 6
console.log(g(5)); // 5*2 = 10
console.log(fg(5)); // (5+1)*2 = 12
console.log(gf(5)); // (5*2)+1 = 11
console.log(ff(5)); // (5+1)+1 = 7
console.log(gg(5)); // (5*2)*2 = 20


var fggf = compose(fg, gf);

console.log(fggf(5));  //  ((5+1)*2) * 2 + 1 = 25
