var HelloComponent = React.createClass(
{
  render: function()
  {
    var el = (
      <div>
        Hello
        <ChildrenComponent/>
      </div>
    );
    return el;
  }
});

var ChildrenComponent = React.createClass(
{
  render: function()
  {
    var elArray = [<ChildComponent/>,<ChildComponent/>,<ChildComponent/>];

    var el = (<div>{elArray}</div>);
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
