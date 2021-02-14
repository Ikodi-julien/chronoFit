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
      intervalContainer.id = 'full__' + this.id; // on créé la div interval

      var intervalDiv = document.createElement('div');
      intervalDiv.classList.add('interval');
      intervalDiv.id = this.id;
      intervalDiv.draggable = true;
      intervalDiv.setAttribute('ondragstart', 'dragstart_handler(event)');
      intervalDiv.setAttribute('ondragend', 'dragend_handler(event)'); // on créé l'input "nom"

      var nameInput = document.createElement('input');
      nameInput.type = 'text';
      nameInput.name = 'name-' + this.id; // nameInput.id = 'name__' + this.id

      nameInput.value = this.name;
      nameInput.classList.add('timer__intervals__interval__item');
      nameInput.classList.add('intervalName'); // On crée une div pour recevoir la durée et son label :

      var durationDiv = document.createElement('div');
      durationDiv.classList.add('timer__intervals__interval__item__row'); // on créé l'input durée avec un label

      var durationInput = document.createElement('input');
      durationInput.type = 'number';
      durationInput.name = 'duration-' + this.id;
      durationInput.id = 'duration__' + this.id;
      durationInput.value = this.duration;
      durationInput.classList.add('timer__intervals__interval__item');
      durationInput.classList.add('intervalDuration');
      var label = document.createElement('label');
      label["for"] = 'duration-' + this.id;
      label.textContent = 'Durée : '; // On met durationInput et son label dans la div

      durationDiv.appendChild(label);
      durationDiv.appendChild(durationInput); // on met nom et durée dans la div interval

      intervalDiv.appendChild(nameInput);
      intervalDiv.appendChild(durationDiv); // on met la div interval dans la div du début

      intervalContainer.appendChild(intervalDiv); // on retourne l'élément

      this.htmlElement = intervalContainer;
      return this.htmlElement;
    }
  }]);

  return Interval;
}();

exports.Interval = Interval;