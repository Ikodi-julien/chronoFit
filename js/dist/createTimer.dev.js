"use strict";

var _Interval = require("./classes/Interval.js");

var _Chrono = require("./classes/Chrono.js");

/* --- CONSTANTES CREATE TIMER --- */
var addIntervalButton = document.querySelector("#addInterval");
var intervalNameInput = document.getElementById("intervalName");
var durationInput = document.getElementById("duration");
var intervalsContainer = document.getElementById("timerIntervals");
var intervalsCompteur = 0;
/* --- CONSTANTES READ TIMER--- */

var startCountDownButton = document.querySelector("#timerStartButton");
var stopChronoButton = document.querySelector("#timerPauseButton");
var display = document.getElementById("timerDisplay");
var goToReadTimelineButton = document.getElementById("goToReadTimelineButton");
var intervalsCollection = null;
var durationList = [];
var isListening = false;
/* --- LISTENER CREATE TIMER --- */
// Ajoute une intervalle à la Timeline

addIntervalButton.addEventListener("click", function () {
  // On récupère le nom et la durée de l'interval
  var intervalName = intervalNameInput.value;
  var intervalDuration = durationInput.value; // On créé un objet Interval avec id

  var interval = new _Interval.Interval("interval" + intervalsCompteur, intervalName, intervalDuration); // On ajoute l'interval dans le container d'intervals

  if (interval.duration) {
    intervalsContainer.appendChild(interval.createIntervalHtml()); // On créé une div droppable vide à la fin

    var dropableDiv = document.createElement("div");
    dropableDiv.classList.add("drop");
    dropableDiv.setAttribute("id", "empty__interval" + intervalsCompteur);
    dropableDiv.setAttribute("ondrop", "drop_handler(event)");
    dropableDiv.setAttribute("ondragover", "dragover_handler(event)");
    intervalsContainer.appendChild(dropableDiv); // on oubli pas d'incrémenter le compteur

    intervalsCompteur++;
  }
});
/* --- LISTENER READ COUNTDOWN --- */
// Créé la liste des éléments à lire et affiche la vue countdown

goToReadTimelineButton.addEventListener("click", function () {
  // Toggle une classe qui fait apparaitre la vue du countdown
  // On récup les intervals à lire
  intervalsCollection = document.getElementsByClassName("interval");
  console.log("liste des éléments interval");
  console.log(intervalsCollection); // On récupère la durée des intervals à lire

  for (var i = 0; i < intervalsCollection.length; i++) {
    var duration = intervalsCollection.item(i).childNodes.item(1).innerText;
    durationList.push(duration);
  }
}); // Lance le countdown

startCountDownButton.addEventListener("click", function () {
  console.log("durée du 1er : " + durationList[0]); // On envoi la fonction asynchrone de CAR

  awaitCountDown(durationList);
}); // Eventlistener sur le "X" et le "<-"

/* --- FUNCTIONS READ COUNTDOWN --- */

var promiseCountDown = function promiseCountDown(durationList) {
  return new Promise(function (resolve) {
    // Création d'un chrono chargé de cet interval
    var duration = durationList.shift();
    var chrono = new _Chrono.Chrono(duration, display); // Démarrage du CAR

    chrono.countDown(); // Timeout de la Promise

    var timerPromise = setTimeout(function () {
      resolve(true);
      console.log("La promesse countDown est terminée " + chrono.startTime);
    }, duration * 1000 + 1000); // Fonction appelée en cas de pause du countdown

    var pauseCountdown = function pauseCountdown() {
      var stopTime = chrono.stop();
      console.log("temps récup : " + stopTime);
      durationList.unshift(stopTime);
      clearTimeout(timerPromise);
      resolve(false);
    }; // Création listener pour arrêt du chrono


    if (!isListening) {
      stopChronoButton.addEventListener("click", pauseCountdown);
      isListening = true;
    }
  });
};

var awaitCountDown = function awaitCountDown(durationList) {
  var again, resolve;
  return regeneratorRuntime.async(function awaitCountDown$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          again = true;

        case 1:
          if (!(durationList.length && again)) {
            _context.next = 14;
            break;
          }

          console.log("Taille liste durées : " + durationList.length);
          _context.next = 5;
          return regeneratorRuntime.awrap(promiseCountDown(durationList));

        case 5:
          resolve = _context.sent;
          console.log("resolve : " + resolve);
          console.log("prochain : " + durationList[0]);

          if (resolve) {
            _context.next = 12;
            break;
          }

          again = false;
          console.log("Taille liste !result : " + durationList.length);
          return _context.abrupt("return", false);

        case 12:
          _context.next = 1;
          break;

        case 14:
          return _context.abrupt("return", durationList.length);

        case 15:
        case "end":
          return _context.stop();
      }
    }
  });
};