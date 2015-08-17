(() => {
  'use strict';

  //var util = require('util'); //debug
  var log = (obj) => {
    //console.log(util.inspect(obj, false, null));
    //  console.log(obj);
  };

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

  var timeseq = {};

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

    var f = () => {
      seq.t = Date.now();
    };
    setInterval(f, interval);

    return seq;
  };

  timeseq.timeoutSeq = (interval, store) => {
    var seq = timeseq.seq(store);

    var f = () => {
      seq.t = Date.now();
    };
    setTimeout(f, interval);

    return seq;
  };
  //------------------

  timeseq.sync = (syncseqs, equation) => {

    log('syncseqsOnDefine ');
    log(syncseqs);
    syncseqs.map((syncseq) => {
      log('--syncseqOnDefine ');
      log(syncseq);
    });
    return {
      synctimeseq: {
        syncseqs,
        equation
      }
    };
  };

  //--------
  timeseq.seq = (store) => { // return new seq
    var seq = []; //seq is vanilla JS array + features
    var valOnT;
    var computingF = [];

    seq.store = store;

    seq.onDiscover = (f) => { // this fn is fine on each seqs
      var f1 = () => {
        computingF[computingF.length] = f; //push  f
      };
      return f1;
    };

    //-----------------
    seq.map = (f) => {
      var seq1 = timeseq.seq(seq.store);
      var t0 = Date.now();
      seq.onDiscover((val) => {
        return seq1.t = f(val, t0);
      })();
      return seq1;
    };
    //-----------------
    seq.init = false;
    seq.isUpdated = false;

    seq.syncseqs = [];
    seq.referredseqs = [];

    seq.dseqs = false;

    seq.aInit = () => {

      seq.dseqs = [];

      var walk = (seq1) => {
        seq1.referredseqs.map((referredseq) => {
          if (addArrayList(seq.dseqs, referredseq)) {
            //no exist and add
            walk(referredseq);
            //---------
            referredseq.syncseqs.map((syncseq) => {
              if (addArrayList(seq.dseqs, syncseq)) {
                //no exist and add
                walk(syncseq);
              }
            });
          //---------
          }
        });
      };

      walk(seq);

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
          set(valOrEqF) { //foo.t is set
            if ((!valOrEqF) || (!valOrEqF.synctimeseq)) {
              var ff = () => {
                valOnT = valOrEqF;
                log('valOnT set!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
                log(valOnT);
                seq.isUpdated = true;

                //----------------------
                if (store) {
                  var T = Date.now();
                  IOT[T] = seq.length;
                  TOI[seq.length] = T;
                  this[seq.length] = valOnT;
                }
                //----------------------
                log(seq);
                //finally do own task-----------------
                computingF
                  .map((f) => {
                    f(valOnT);
                  });

                //propagate ======================================
                seq.referredseqs.map((referredseq) => {

                  var checkF = () => {
                    if (referredseq.syncseqs.length === 0) {
                      return false;
                    } else {
                      var flag = true;
                      referredseq.syncseqs.map((syncseq) => {
                        if (syncseq.isUpdated === false) {
                          flag = false; //no functional library here
                        }
                      });
                      return flag;
                    }
                  };
                  log('??????????????? referredseq.isUpdated ???????????????????');
                  log(referredseq.isUpdated);
                  log('??????????????? checkF() ???????????????????');
                  log(checkF());
                  if ((referredseq.isUpdated === false)
                    && (checkF() === true))
                  // the referredseq's all syncseq.isUpdated === true
                  {
                    log('$$$$$$$$$$$$$$$$$$$$$$$$ the referredseqs all syncseq.isUpdated === true $$$$$$$$$$$$$$$$$$$$$$$$');
                    referredseq.t = referredseq.eqF();
                  //arg must be empty in terms of math eq style
                  }
                });

              };

              if (seq.isUpdated === false) {
                if ((seq.init === false) && (seq.syncseqs.length === 0)) {
                  seq.init = true;
                  seq.aInit(); //the first update of no dependency seq without eq
                  ff();
                } else {
                  ff(); //library internal updated, keep going
                }

              } else {
                log('@@@@@@@@@@@    seq.isUpdated === true    @@@@@@@@@@');
                log('     dependencyErrorCheck    ');
                // can be proper new update cycle, can be illegal
                if (seq.syncseqs.length !== 0) {
                  throw new Error("the value depends on another value");
                } else {
                  var clearUpdatedFlag = () => {

                    seq.dseqs.map((seq1) => {
                      seq1.isUpdated = false;
                      log('>>>>>>>>>seq1.isUpdated = false;>>>>>>>>>>>');
                      log(seq1);
                    });

                  };
                  log('    clearUpdatedFlag    ');
                  clearUpdatedFlag();
                  ff(); //manual updated new cycle
                }
              }

            //======================================
            } else {
              seq.isUpdated = false;

              //retain the equationF
              seq.eqF = valOrEqF.synctimeseq.equation;
              //obtain own seq.syncseqs on = triggered
              seq.syncseqs = valOrEqF.synctimeseq.syncseqs;

              if (seq.syncseqs.length === 0) {

              } else {
                // add self seq as the referredseq to syncseq
                seq.syncseqs.map((syncseq) => {

                  addArrayList(syncseq.referredseqs, seq);

                });
              }
              log('@@@@@@@@@@ = triggered @@@@@@@@@@');
              log(seq);
              log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');

            }
          }
        }
      });

    return seq;
  };
  //--------

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = timeseq;
  } else {
    window.__ = timeseq;
  }

})();
