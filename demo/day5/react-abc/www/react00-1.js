var HelloComponent = React.createClass(
{
  render: function()
  {
    var el = (<div>Hello</div>);
    return el;
  }
});

var HelloComponentEL = <HelloComponent/>;
var mount = React.render(HelloComponentEL, document.body);
