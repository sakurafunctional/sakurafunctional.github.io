(() => {
  'use strict';

  var log;
  if (typeof module !== 'undefined' && module.exports) {
    var util = require('util'); //debug
    log = (obj) => {
      //  console.info(util.inspect(obj, false, null));
    };
  } else {
    log = (obj) => {
      //    console.info(obj);
    };
  }
  //-----------------------------------
  var containList = (array, item) => {
    var flag = false;
    array.map((o) => {
      if (o === item) {
        flag = true;
      }
    });
    return flag;
  };
  var addArrayList = (array, item) => {
    var flag = containList(array, item);
    if (flag === false) {
      array[array.length] = item;
    }
    return !flag;
  };
  //-----------------------------------
  //__([a,b], true)     true as store
  var timeseq = (...args) => {

    if (Array.isArray(args[0])) {

      var ds = args[0];
      var store = args[1];

      var seq1 = seq(store);

      //ds and us
      seq1.ds = ds;
      // add self seq as the u to d
      ds.map((d) => {
        addArrayList(d.us, seq1);
      });

      seq1.eq = () => ds.map((seq) => seq.t);

      log('########__([x])###########');
      log({
        seq1
      });

      return seq1;

    } else {
      var seq1 = seq(args[0]);

      log({
        seq1
      });
      return seq1;
    }
  };

  Object.defineProperties(timeseq,
    {
      t: {
        get() {
          return Date.now();
        },
        set(f) {
          f();
        }
      }
    });

  timeseq.log = (...args) => {
    var f = () => {
      console.info.apply(console, args);
    };
    return f;
  };

  timeseq.wrap = (legacyF) => {
    var f = (...args) => {
      var wrappedF = () => {
        legacyF(...args);
      };
      return wrappedF;
    };
    return f;
  };

  timeseq.intervalSeq = (interval, store) => {
    var seq = timeseq.seq(store);

    //seq.intervalSeq = true;
    var f = () => {
      seq.t = Date.now();
    };
    setInterval(f, interval);

    return seq;
  };

  timeseq.timeoutSeq = (interval, store) => {
    var seq = timeseq.seq(store);

    //seq.timeoutSeq = true;
    var f = () => {
      seq.t = Date.now();
    };
    setTimeout(f, interval);

    return seq;
  };
  //------------------

  //--------
  var seq = (store) => { // return new seq
    var seq = []; //seq is vanilla JS array + features
    var valOnT;

    seq.store = store;
    //-----------------
    seq.tMap = (f) => {
      var seq1 = timeseq.seq(seq.store); // new with left-store

      seq1.ds = [seq];
      addArrayList(seq.us, seq1);

      var t0 = Date.now();
      seq1.eq = (t) => f(t, t0);

      return seq1;
    };
    //-----------------

    seq.init = false;
    seq.isUpdated = false;

    seq.us = [];
    seq.ds = [];

    seq.eco = false;

    seq.aInit = () => { //for bottom seq
      log('aInit!!!!!!!!!!!!!!!!!!!!!!!!!!');
      seq.eco = [];
      var walk = (seq1) => {
        seq1.us.map((u) => {
          if ((u !== seq1) && (addArrayList(seq.eco, u))) {
            //no exist and add
            walk(u);
          }
        });
        seq1.ds.map((d) => {
          if ((d !== seq1) && (addArrayList(seq.eco, d))) {
            //no exist and add
            walk(d);
          }
        });
      };

      walk(seq);

      log('$$$$$$ seq.eco ');
      log(seq.eco.length);
      log(seq.eco);

    };

    var IOT = {};
    seq.IndexOnTimestamp = (timestamp) => {
      return IOT[timestamp];
    };

    var TOI = {};
    seq.TimestampOnIndex = (index) => {
      return TOI[index];
    };

    seq.T = (timestamp) => {
      if (store) {
        return (seq[seq.IndexOnTimestamp(timestamp)]);
      } else {
        throw new Error("store flag is not true");
      }
    };

    Object.defineProperties(seq, //detect t update on each seqs
      {
        t: { //foo.t
          get() {
            return valOnT;
          },
          set(tval) {

            //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            var ff = () => {
              valOnT = tval;
              seq.isUpdated = true;

              //----------------------
              if (store) {
                var T = Date.now();
                IOT[T] = seq.length;
                TOI[seq.length] = T;
                this[seq.length] = valOnT;
              }
              //----------------------
              //propagate ======================================
              seq.us.map((u) => {

                var checkF = () => {
                  var flag = true;
                  u.ds.map((d) => {
                    if (d.isUpdated === false) {
                      flag = false; //no functional library here
                    }
                  });
                  return flag;
                };
                if ((u.isUpdated === false)
                  && (checkF() === true))
                // the us's all d.isUpdated === true
                {
                  u.t = u.eq(tval);
                }
              });

            };
            //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

            if (seq.isUpdated === false) {
              if ((seq.init === false)
                && (seq.ds.length === 0)) { // bottom
                seq.init = true;
                seq.aInit(); //the first update of bottom
                ff();
              } else {
                ff(); //library internal updated, keep going
              }
            } else {
              // can be proper new update cycle, can be illegal
              if (seq.ds.length !== 0) { // not bottom

                throw new Error("the value depends on another value");
              } else { //bottom

                log('############bottom update!###########');
                var clearUpdatedFlag = () => {
                  seq.eco.map((seq1) => {
                    seq1.isUpdated = false;
                  });
                };
                clearUpdatedFlag();
                ff(); //manual updated new cycle
              }
            }

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
