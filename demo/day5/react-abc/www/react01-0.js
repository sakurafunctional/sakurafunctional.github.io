  var HelloComponent = React.createClass(
  {
    render: function()
    {
      var el = (
        <div>
          Hello
          <div>child</div>
          <div>child</div>
          <div>child</div>
        </div>
      );
      return el;
    }
  });

  var mount = React.render(<HelloComponent/>, document.body);
