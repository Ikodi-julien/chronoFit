"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Interval = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Represente un interval de temps à l'intérieur d'une timeline
 * d'entrainement.
 * Paramètres : name, duration, htmlElement
 *
 * Fonctions : createIntervalHtml()
 */
var Interval =
/*#__PURE__*/
function () {
  function Interval(name, duration) {
    _classCallCheck(this, Interval);

    this.name = name;
    this.duration = duration;
    this.htmlElement = null;
  }

  _createClass(Interval, [{
    key: "createIntervalHtml",
    value: function createIntervalHtml() {
      var intervalDiv = document.createElement('div');
      intervalDiv.classList.add('timer__intervals__interval');
      var nameDiv = document.createElement('div');
      nameDiv.innerText = this.name;
      nameDiv.classList.add('timer__intervals__interval__item');
      var durationDiv = document.createElement('div');
      durationDiv.innerText = this.duration;
      durationDiv.classList.add('timer__intervals__interval__item');
      intervalDiv.appendChild(nameDiv);
      intervalDiv.appendChild(durationDiv);
      this.htmlElement = intervalDiv;
      return this.htmlElement;
    }
  }]);

  return Interval;
}();

exports.Interval = Interval;