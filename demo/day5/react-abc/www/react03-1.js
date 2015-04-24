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
    var createChild = function(n)
    {
      return (<ChildComponent input={n}/>);
    };

    var array = Immutable.Range(0, 9).toArray();
    var elArray = array.map(createChild);

    var el = (<div>{elArray}</div>);
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
