var HelloComponent = React.createClass(
{
  render: function()
  {
    return <div>Hello {this.props.name}</div>;
  }
});

var mount = React.render(<HelloComponent name="John" />, document.body);
