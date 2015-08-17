/*global React __ */

(() => {
  'use strict';

  //MKS system of units
  var V0 = 85.0; // m/s
  var DEG = 30; //degree
  var THETA = DEG / 180 * Math.PI; //radian
  var G = 9.8; //gravity const

  //t seconds elapsed since t0
  //10msec time resolution
  var t = __.intervalSeq(10).map((tt, t0) => (tt - t0) / 1000);

  var x = __.seq();
  var y = __.seq();

  x.t = __.sync([t], () => V0 * Math.cos(THETA) * t.t);
  y.t = __.sync([t], () => V0 * Math.sin(THETA) * t.t - G * Math.pow(t.t, 2));

  //atomic position update
  var pos = __.seq();
  pos.t = __.sync([t, x, y], () => ({
      x: x.t,
      y: y.t
  }));

  //==============================================================
  var Drawscale = 4; //4 dot = 1 meter

  class ReactComponent extends React . Component {

    constructor() {
      super();
      this.pos = __.seq();
      this.pos.t = __.sync([pos], () => ({
          x: 50 + pos.t.x * Drawscale,
          y: 300 - pos.t.y * Drawscale
      }));
      __.t = this.pos.onDiscover(() => {
        this.rx = this.pos.t.x;
        this.ry = this.pos.t.y;
        this.forceUpdate();
      });
    }

    render() {
      var el = (
      <div>
          <h1>For new shot, Just Reload the browser page</h1>
          <svg height = "100%"  width = "100%">
              <circle r="5" fill="blue"
      cx = {this.rx}
      cy = {this.ry}/>
          </svg>
        </div>
      );
      return el;
    };
  }

  var mount = React.render(<ReactComponent/>, document.body);

})();
