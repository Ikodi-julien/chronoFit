"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Countdown = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Countdown =
/*#__PURE__*/
function () {
  function Countdown() {
    _classCallCheck(this, Countdown);

    this.startTime;
    this.countdown;
    this.timeDisplay = document.querySelector('#timeDisplay');
  }

  _createClass(Countdown, [{
    key: "startCount",
    value: function startCount(time) {
      this.startTime = time;
      this.countdown = setInterval(function () {
        if (this.startTime <= 0) {
          this.timeDisplay.innerText = 0;
          this.stop();
        }

        this.startTime -= 1;
      }, 1000);
    }
  }, {
    key: "stopCount",
    value: function stopCount() {
      clearInterval(countdown);
    }
  }]);

  return Countdown;
}();

exports.Countdown = Countdown;