/* jshint node: true */
/* global window,document, $,alert,history */
"use strict";

var timelineCapacity = moment.duration(1, 'seconds');

var ___mouseCursor = ___(timelineCapacity);
var ___mouseIsDown = ___(timelineCapacity);
var ___mouseDrag = ___(timelineCapacity);

var Component1 = React.createClass(
{
  getInitialState: function()
  {
    return {cursor: {x: 100, y: 100}};
  },
  onMouseMove: function(e)
  {
    ___mouseCursor.appear({x: e.clientX, y: e.clientY});
  },
  onMouseDown: function(e)
  {
    ___mouseIsDown.appear(true);
  },
  onMouseUp: function(e)
  {
    ___mouseIsDown.appear(false);
  },
  componentDidMount: function()
  {
    var component = this;

    document.addEventListener("mousemove", this.onMouseMove);
    document.addEventListener("mousedown", this.onMouseDown);
    document.addEventListener("mouseup", this.onMouseUp);

    ___mouseCursor.compute(function(x)
    {
      if(___mouseIsDown.value(___('NOW')))
        ___mouseDrag.appear(x);
    });

    ___mouseIsDown.compute(function(x)
    {

    });

    ___mouseDrag.compute(function(x)
    {
      component.setState({cursor: x});
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
