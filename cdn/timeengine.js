'use strict';

(function () {
  'use strict';

  var log;
  if (typeof module !== 'undefined' && module.exports) {
    var util = require('util'); //debug
    log = function (obj) {
      //  console.info(util.inspect(obj, false, null));
    };
  } else {
      log = function (obj) {
        //    console.info(obj);
      };
    }
  //-----------------------------------

  var seqID = function seqID() {
    var id = 0;
    var getID = function getID() {
      return id++;
    };
    return getID;
  };

  var getID = seqID();
  //-----------------------------------
  //__([a,b], true)     true as store
  var timeseq = function timeseq() {

    if (Array.isArray(arguments[0])) {

      var ds = arguments[0];
      var store = arguments[1];

      var seq1 = seq(store);

      //ds and us
      ds.map(function (d) {
        //  seq1.ds = ds;
        seq1.ds[d.id] = d;
        seq1.dsIsUpdated[d.id] = false;
        // add self seq as the u to d
        d.us[seq1.id] = seq1;
      });

      seq1.eq = function (xx) {
        log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        log(xx);
        return ds.map(function (seq) {
          return seq.t;
        });
      };

      log('########__([x])###########');
      log({
        seq1: seq1
      });

      return seq1;
    } else {
      var seq1 = seq(arguments[0]);

      log({
        seq1: seq1
      });
      return seq1;
    }
  };

  Object.defineProperties(timeseq, {
    t: {
      get: function get() {
        return Date.now();
      },
      set: function set(f) {
        f();
      }
    }
  });

  timeseq.log = function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var f = function f() {
      console.info.apply(console, args);
      return args;
    };
    return f;
  };

  timeseq.wrap = function (legacyF) {
    var f = function f() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var wrappedF = function wrappedF() {
        legacyF.apply(undefined, args);
      };
      return wrappedF;
    };
    return f;
  };

  timeseq.intervalSeq = function (interval, store) {
    var seq = timeseq.seq(store);

    //seq.intervalSeq = true;
    var f = function f() {
      seq.t = Date.now();
    };
    setInterval(f, interval);

    return seq;
  };

  timeseq.timeoutSeq = function (interval, store) {
    var seq = timeseq.seq(store);

    //seq.timeoutSeq = true;
    var f = function f() {
      seq.t = Date.now();
    };
    setTimeout(f, interval);

    return seq;
  };
  //------------------
  //--------
  var seq = function seq(store) {
    // return new seq
    var seq = []; //seq is vanilla JS array + features
    var valOnT;

    seq.id = getID();

    seq.store = store;
    //-----------------
    seq.tMap = function (f) {
      var seq1 = timeseq.seq(seq.store); // new with left-store

      //ds and us
      //  seq1.ds = ds;
      seq1.ds[seq.id] = seq;
      seq1.dsIsUpdated[seq.id] = false;
      // add self seq as the u to d
      seq.us[seq1.id] = seq1;

      var t0 = Date.now();
      seq1.eq = function (t) {
        return f(t, t0);
      };

      return seq1;
    };
    //-----------------
    seq.seqMap = function (immutableSeq) {

      var seq1 = timeseq.seq(seq.store); // new with left-store

      //ds and us
      //  seq1.ds = ds;
      seq1.ds[seq.id] = seq;
      seq1.dsIsUpdated[seq.id] = false;
      // add self seq as the u to d
      seq.us[seq1.id] = seq1;

      var it = immutableSeq.values();
      seq1.eq = function () {
        return it.next().value;
      };

      return seq1;
    };

    //-----------------
    seq.us = {};
    seq.ds = {};
    seq.dsIsUpdated = {};

    var IOT = {};
    seq.IndexOnTimestamp = function (timestamp) {
      return IOT[timestamp];
    };

    var TOI = {};
    seq.TimestampOnIndex = function (index) {
      return TOI[index];
    };

    seq.T = function (timestamp) {
      if (store) {
        return seq[seq.IndexOnTimestamp(timestamp)];
      } else {
        throw new Error("store flag is not true");
      }
    };

    Object.defineProperties(seq, //detect t update on each seqs
    {
      t: { //foo.t

        get: function get() {
          return valOnT;
        },
        set: function set(tval) {
          log('-----tval');
          log(tval);
          valOnT = tval;
          //----------------------
          if (store) {
            var T = Date.now();
            IOT[T] = seq.length;
            TOI[seq.length] = T;
            this[seq.length] = valOnT;
          }
          //----------------------

          Object.keys(seq.us).map(function (id) {
            log('--id');
            log(id);
            var u = seq.us[id];
            //=================
            if (false && Object.keys(seq.ds).length !== 0) {
              // not bottom
              throw new Error("the value depends on another value");
            } else {
              //bottom
              u.dsIsUpdated[seq.id] = true;
              //propagate ======================================
              log('############bottom update!###########');
              var flag = true;
              Object.keys(u.ds).map(function (id) {
                log(id);
                log(u.dsIsUpdated[id]);
                if (u.dsIsUpdated[id] === false) {
                  flag = false; //no functional library here
                }
              });
              log('=calced flag');
              log(flag);

              if (flag === true)
                // the us's all d.isUpdated === true
                {
                  u.t = u.eq(tval);

                  Object.keys(u.ds).map(function (id) {
                    u.dsIsUpdated[id] = false;
                  });
                }
              //=================
            }
          });
        }
      }
    });

    return seq;
  };
  //--------
  timeseq.seq = seq;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = timeseq;
  } else {
    window.__ = timeseq;
  }
})();
