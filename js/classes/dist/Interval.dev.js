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
  function Interval(id, name, duration) {
    _classCallCheck(this, Interval);

    this.id = id;
    this.name = name;
    this.duration = duration;
    this.htmlElement = null;
  }

  _createClass(Interval, [{
    key: "createIntervalHtml",
    value: function createIntervalHtml() {
      // on créé une div qui contiendra l'interval dragable
      var intervalContainer = document.createElement('div');
      intervalContainer.classList.add('drop');
      intervalContainer.setAttribute('id', 'full__' + this.id); // on créé la div interval

      var intervalDiv = document.createElement('div');
      intervalDiv.classList.add('interval');
      intervalDiv.setAttribute('id', this.id);
      intervalDiv.setAttribute('draggable', 'true');
      intervalDiv.setAttribute('ondragstart', 'dragstart_handler(event)'); // on créé la div nom

      var nameDiv = document.createElement('div');
      nameDiv.innerText = this.name;
      nameDiv.classList.add('timer__intervals__interval__item');
      nameDiv.classList.add('intervalName'); // on créé la div durée

      var durationDiv = document.createElement('div');
      durationDiv.setAttribute('id', 'duration__' + this.id);
      durationDiv.innerText = this.duration;
      durationDiv.classList.add('timer__intervals__interval__item');
      durationDiv.classList.add('intervalDuration'); // on met nom et durée dans la div interval

      intervalDiv.appendChild(nameDiv);
      intervalDiv.appendChild(durationDiv); // on met la div interval dans la div du début

      intervalContainer.appendChild(intervalDiv); // on retourne l'élément

      this.htmlElement = intervalContainer;
      return this.htmlElement;
    }
  }]);

  return Interval;
}();

exports.Interval = Interval;