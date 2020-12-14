"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Chrono = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Object Chrono,
 * ATTRIBUTS D'INSTANCE :
 *  - startTime = integer, le temps de départ (0 par défaut)
 *  - display = HTMLElement dans lequel afficher,
 *  - interval = représente setInterval en cours.
 *
 * FONCTIONS :
 * - countAhead : Compte de 0 jusqu'à l'info de stopper, +1 à chaque seconde
 * - countDown : Compte à rebours depuis un temps donner jusqu'à 0,
 *    - return "true" à 0
 * - stop : Arrête countAhead et countDown,
 *    - return "true"
 */
var Chrono =
/*#__PURE__*/
function () {
  function Chrono(startTime, display) {
    _classCallCheck(this, Chrono);

    this.startTime = startTime;
    this.display = display;
    this.interval = null;
    this.nextCountDown = false;
    console.log("nouvel objet Chrono créé");
  }

  _createClass(Chrono, [{
    key: "countAhead",
    value: function countAhead() {
      var _this = this;

      console.log("départ chrono sur = " + this.display);

      var aRepeter = function aRepeter() {
        // On affiche le temps
        _this.display.innerText = _this.startTime;
        _this.startTime += 1;
      };

      this.interval = setInterval(aRepeter, 1000);
    }
  }, {
    key: "countDown",
    value: function countDown() {
      var _this2 = this;

      console.log("départ compte à rebours sur = " + this.display);
      this.display.innerText = this.startTime;

      var aRepeter = function aRepeter() {
        if (_this2.startTime <= 0) {
          clearInterval(_this2.interval);
        } else {
          if (_this2.startTime > 0 && _this2.startime < 5) {
            _this2.playFirstBip();
          }

          _this2.startTime -= 1;
          _this2.display.innerText = _this2.startTime;
        }
      };

      this.interval = setInterval(aRepeter, 1000);
    }
  }, {
    key: "stop",
    value: function stop() {
      console.log("Arrêt du chrono");
      clearInterval(this.interval);
      this.display.innerText = this.startTime;
      return this.startTime;
    }
  }, {
    key: "playFirstBip",
    value: function playFirstBip() {
      var firstBip = document.getElementById("firstBip");
      firstBip.play();
      console.log("on fait Bip !");
    }
  }]);

  return Chrono;
}();

exports.Chrono = Chrono;