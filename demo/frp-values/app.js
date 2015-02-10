var ___ = require('timecomponent');
var moment = require('moment');

var timelineCapacity = moment.duration(10, 'seconds');

var ___a = ___(timelineCapacity);
var ___b = ___(timelineCapacity);

var f = function()
{
  ___a.appear(___a.value(___('NOW')) + 1);
};

var interval = setInterval(f, 1000);

___a.compute(function(x)
{
  console.info('a: ', x);
  ___b.appear(x * 5);
});

___b.compute(function(x)
{
  console.info('b: ', x);
});
