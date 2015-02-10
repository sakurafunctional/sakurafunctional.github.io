/* jshint node: true */
/* jshint jquery: true */
/* jshint sub: true */
/* global window,document, $,alert,history */
"use strict";

var timelineCapacity = moment.duration(1, 'seconds');

var ___mouseIsDown = ___(timelineCapacity);
var ___mouseDrag = ___(timelineCapacity);

var onMouseMove = function(e)
{
  var cursor = {
    x: e.clientX,
    y: e.clientY
  };
};

var onMouseDown = function(e)
{
  ___mouseIsDown.appear(true);
};

var onMouseUp = function(e)
{
  ___mouseIsDown.appear(false);
};

var Component1 = React.createClass(
{
  getInitialState: function()
  {
    return {cursor: {x: 100, y: 100}};
  },
  componentDidMount: function()
  {
    var component = this;

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);

    ___mouseIsDown.compute(function(x)
    {
      if(x)
        ___mouseDrag.appear(cursor);
    });

    ___mouseDrag.compute(function(x)
    {
      component.setState({cursor: ___mouseDrag.value(___('NOW'))});
    });
  },
  render: function()
  {
      return (<div><svg height = "100%"  width = "100%" >
      <circle cx = {this.state.cursor.x}
      cy = {this.state.cursor.y} r="10" fill="blue" />
      </svg></div>);
  }
});

React.render(<Component1/>, document.body);
