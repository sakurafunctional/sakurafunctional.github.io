/* jshint node: true */
/* jshint jquery: true */
/* jshint sub: true */
/* global window,document, $,alert,history */
"use strict";

  var timelineCapacity = moment.duration(10, 'seconds');

  var ___cursor = ___(timelineCapacity);

  var onMouseMove = function(e)
  {

    var cursor = {
      x: e.clientX,
      y: e.clientY
    };

    ___cursor.appear(cursor);
  };

  var Component1 = React.createClass(
  {
    getInitialState: function()
    {
      return {cursor: {x: 100, y: 100}};
    },
    tick: function()
    {
      this.setState({cursor: ___cursor.value(___('NOW').subtract(1, 'seconds'))});
    },
    componentDidMount: function()
    {
      document.addEventListener("mousemove", onMouseMove);
      ___cursor.compute(function() {});
      this.interval = setInterval(this.tick, 1);
    },
    componentWillUnmount: function()
    {
      clearInterval(this.interval);
    },
    render: function()
    {
      return ( <div> <svg height = "100%"  width = "100%" >
      <circle cx = {  this.state.cursor.x  }  cy = {  this.state.cursor.y }  r = "20"  fill = "red" />
      </svg></div>);
    }
  });

  React.render(<Component1/>, document.body);
