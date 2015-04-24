var HelloComponent = React.createClass(
{
  render: function()
  {
    return (<div>Hello</div>);
  }
});


var mount = React.render(<HelloComponent/>, document.body);
