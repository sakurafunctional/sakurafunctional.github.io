/*global React __ */

(() => {
  'use strict';

  //***React state with life cycle is stateless sequence*****
  var seqComponent = (__seq) => {

    class SeqComponent extends React.Component {
      constructor() {
        super();
        this.state = {
          seq: __seq.t
        };
        var timeseq = __seq
          .tMap((val) => {
            this.setState({
              seq: val
            });
          });
      }
      render() {
        return (<span>{this.state.seq}</span>);
      };
    }

    return (<SeqComponent/>);
  };
  //**************************************

  //-------Physics-------------------------------

  //MKS system of units
  var V0 = 85.0; // m/s
  var DEG = 40; //degree
  var THETA = DEG / 180 * Math.PI; //radian
  var G = 9.8; //gravity const

  //10msec time resolution
  //t seconds elapsed since t0
  var t = __.intervalSeq(10).tMap((tt, t0) => (tt - t0) / 1000);

  var x = t.tMap((t) => V0 * Math.cos(THETA) * t);

  var y = t.tMap((t) => V0 * Math.sin(THETA) * t - 1 / 2 * G * Math.pow(t, 2));

  //==============================================================
  var Drawscale = 2; //2 dot = 1 meter

  var PhysicsComponent = () => {

    var __seqElement = __([x, y]) //atomic update
      .tMap(([x, y]) => (
      <div>
        <svg height = "100%"  width = "100%">
            <circle r="3" fill="red"
        cx = {50 + x * Drawscale} cy = {500 - y * Drawscale}/>
        </svg>
      </div>));

    var el = (<div>{seqComponent(__seqElement)}</div>);

    return el;
  };


  var mount = React.render(PhysicsComponent(), document.getElementById('container'));

})();
