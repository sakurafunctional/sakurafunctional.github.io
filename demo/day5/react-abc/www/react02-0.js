var HelloComponent = React.createClass(
{
  render: function()
  {
    var el = (
      <div>
        Hello
        <ChildComponent input={0}/>
        <ChildComponent input={1}/>
        <ChildComponent input={2}/>
      </div>
    );
    return el;
  }
});

var ChildComponent = React.createClass(
{
  render: function()
  {
    var el = (<div>child{this.props.input}</div>);
    return el;
  }
});

var mount = React.render(<HelloComponent/>, document.body);
