/*global React __ */

(() => {
  'use strict';
  //MKS system of units
  var V0 = 85.0; // m/s
  var DEG = 30; //degree
  var THETA = DEG / 180 * Math.PI; //radian
  var G = 9.8; //gravity const

  //10msec time resolution
  //t seconds elapsed since t0
  var t = __.intervalSeq(10).tMap((tt, t0) => (tt - t0) / 1000);

  var x = t.tMap((t) => V0 * Math.cos(THETA) * t);

  var y = t.tMap((t) => V0 * Math.sin(THETA) * t - G * Math.pow(t, 2));

  //atomic position update
  var pos = __([t, x, y])
    .tMap((val) => ({
        x: x.t,
        y: y.t
    }));

  //==============================================================
  var Drawscale = 4; //4 dot = 1 meter

  class ReactComponent extends React.Component {

    constructor() {
      super();
      var timeseq = pos
        .tMap((val) => ({
            x: 50 + val.x * Drawscale,
            y: 300 - val.y * Drawscale
        }))
        .tMap((val) => {
          this.rx = val.x;
          this.ry = val.y;
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
