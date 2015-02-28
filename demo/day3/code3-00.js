var moment = require('moment');

var f = function()
{
  console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));
};

var clock = setInterval(f, 1000);
