var HelloComponent = React.createClass(
{
  render: function()
  {
    var el = (
      <div>
        Hello
        <ChildComponent/>
        <ChildComponent/>
        <ChildComponent/>
      </div>
    );
    return el;
  }
});

var ChildComponent = React.createClass(
{
  render: function()
  {
    var el = (<div>child</div>);
    return el;
  }
});

var mount = React.render(<HelloComponent/>, document.body);
