"use strict";

var _Interval = require("./classes/Interval.js");

var _Chrono = require("./classes/Chrono.js");

/* --- CONSTANTES CREATE TIMER --- */
var addIntervalButton = document.querySelector("#addInterval");
var intervalNameInput = document.getElementById("intervalName");
var durationInput = document.getElementById("duration");
var intervalsContainer = document.getElementById("timerIntervals");
var totalTimePreview = document.getElementById("totalTimePreview");
var timerReadPage = document.getElementById("timerRead");
var intervalsCompteur = 0; // On créé un ojet event, sera lancer pour déclencher les rafraichissements

var event = new Event("build");
/* --- CONSTANTES READ TIMER--- */

var startCountDownButton = document.querySelector("#timerStartButton");
var stopChronoButton = document.querySelector("#timerPauseButton");
var display = document.getElementById("timerDisplay");
var goToReadTimelineButton = document.getElementById("goToReadTimelineButton");
var exoNameDisplay = document.getElementById("exoNameDisplay");
var timerReadClose = document.getElementById("timerReadClose");
var intervalsCollection = null;
var durationList = [];
var exoNameList = [];
var chronoId = [];
var isListening = false;
var isReading = false;
var firstCountdown = true;
var timerPromise = 0;
document.addEventListener("DOMContentLoaded", function () {
  /**
   *
   *
   *
   * --- LISTENER CREATE TIMER ---
   *
   *
   *
   **/
  // Ajoute une intervalle à la Timeline
  addIntervalButton.addEventListener("click", function () {
    // On récupère le nom et la durée de l'interval
    var intervalName = intervalNameInput.value;
    var intervalDuration = durationInput.value; // On créé un objet Interval avec id

    var interval = new _Interval.Interval("interval" + intervalsCompteur, intervalName, intervalDuration);

    if (interval.duration) {
      // On ajoute l'interval dans le container d'intervals
      intervalsContainer.appendChild(interval.createIntervalHtml()); // On créé une div droppable vide à la fin

      var dropableDiv = document.createElement("div");
      dropableDiv.classList.add("drop");
      dropableDiv.setAttribute("id", "empty__interval" + intervalsCompteur);
      dropableDiv.setAttribute("ondrop", "drop_handler(event)");
      dropableDiv.setAttribute("ondragover", "dragover_handler(event)");
      dropableDiv.setAttribute("ondragleave", "dragleave_handler(event)");
      intervalsContainer.appendChild(dropableDiv); // on oubli pas d'incrémenter le compteur

      intervalsCompteur++; // On rafraichit les listes de durées et noms

      refreshDurationsAndNames(); // On envoi un event pour le recalcul du temps total

      document.dispatchEvent(event);
    }
  }); // On affiche le temps total à chaque nouvel event "build"

  document.addEventListener("build", function () {
    refreshDurationsAndNames();
    refreshTotalTime();
  });
  /**
   *
   *
   *
   *  --- LISTENER READ COUNTDOWN ---
   *
   *
   *
   **/
  // Créé la liste des éléments à lire et affiche la vue countdown

  goToReadTimelineButton.addEventListener("click", function () {
    // Toggle une classe qui fait apparaitre la vue du countdown
    timerReadPage.classList.add("timer__read__show");
    refreshDurationsAndNames();
  }); // EventListener pour revenir à la page de création (le "X")

  timerReadClose.addEventListener("click", function () {
    timerReadPage.classList.remove("timer__read__show");
  }); // Lance le countdown

  startCountDownButton.addEventListener("click", function () {
    // On ajoute 5 secondes de prépa "READY ?" au début si c'est le premier démarrage
    if (firstCountdown) {
      durationList.unshift(5);
      exoNameList.unshift("READY ?");
      firstCountdown = false;
    }

    console.log("Start, contenu durées : " + durationList);
    console.log("Start, contenu exoName : " + exoNameList); // On envoi la fonction asynchrone de CAR

    awaitCountDown();
  });
});
/**
 *
 *
 *
 * --- FONCTIONS CREATE COUNTDOWN ---
 *
 *
 *
 */

/**
 *  Rafraichie la liste des durées et des noms
 **/

var refreshDurationsAndNames = function refreshDurationsAndNames() {
  // On commence par vider la liste de durées et noms, au cas où
  durationList = [];
  exoNameList = []; // On récup les intervals à lire

  intervalsCollection = document.getElementsByClassName("interval"); // console.log("liste des éléments interval");
  // console.log(intervalsCollection);

  if (intervalsCollection.length) {
    // On récupère la durée des intervals à lire
    for (var i = 0; i < intervalsCollection.length; i++) {
      var duration = intervalsCollection.item(i).childNodes.item(1).innerText;
      durationList.push(duration);
    } // On récupère les noms des intervals à lire


    for (var _i = 0; _i < intervalsCollection.length; _i++) {
      var exoName = intervalsCollection.item(_i).childNodes.item(0).innerText;
      exoNameList.push(exoName);
    }
  }
};
/**
 * Additionne les durées des intervals
 */


var sumIntervalsTimes = function sumIntervalsTimes() {
  var timelineTotalDuration = 0;

  for (var i = 0; i < durationList.length; i++) {
    timelineTotalDuration += parseInt(durationList[i]);
  }

  return timelineTotalDuration;
};
/**
 * Rafraichi l'affichage du temps total
 */


var refreshTotalTime = function refreshTotalTime() {
  var timelineTotalDuration = sumIntervalsTimes();
  console.log("Durée totale depuis refreshTotalTime : " + timelineTotalDuration);
  totalTimePreview.innerText = newTotalTimeString(timelineTotalDuration);
};
/**
 * Create a string to display from seconds,
 * Exemple : 157 s => 02:37
 */


var newTotalTimeString = function newTotalTimeString(totalDuration) {
  var unitMin = Math.floor(totalDuration / 60 % 10);
  var tenMin = Math.floor(totalDuration / 600);
  var unitSec = Math.floor(totalDuration % 60 % 10);
  var tenSec = Math.floor(totalDuration % 60 / 10);
  var string = tenMin + "" + unitMin + ":" + tenSec + "" + unitSec;
  return string;
};
/**
 *
 *
 *
 *  --- FUNCTIONS READ COUNTDOWN ---
 *
 *
 *
 **/

/**
 * Promise awaited by awaitCountdown(),
 * Click pause button => resolve(false)
 * Countdown ends => resolve(true)
 */


var promiseCountDown = function promiseCountDown() {
  return new Promise(function (resolve) {
    // Création d'un chrono chargé de cet interval
    var duration = durationList.shift();
    var chrono = new _Chrono.Chrono(duration, display);
    chronoId.unshift(chrono); // Démarrage du CAR

    chronoId[0].countDown();
    isReading = true; // Timeout de la Promise

    if (isReading) {
      timerPromise = setTimeout(function () {
        isReading = false;
        resolve(true);
        chronoId = [];
        console.log("La promesse est true");
      }, duration * 1000 + 1000);
    } // Fonction appelée en cas de pause du countdown


    var pauseCountdown = function pauseCountdown() {
      if (isReading) {
        // On arrête le chrono
        var stopTime = chronoId[0].stop();
        isReading = false;
        console.log("Pause, temps récup : " + stopTime); // On ajoute le temps restant et le nom au début de la liste

        durationList.unshift(stopTime);
        exoNameList.unshift(exoNameDisplay.innerText); // On clear la Promise

        clearTimeout(timerPromise);
        console.log("DurationList après unshift() : " + durationList);
        resolve(false);
      }
    }; // Création listener pour arrêt du chrono


    if (!isListening) {
      stopChronoButton.addEventListener("click", pauseCountdown);
      isListening = true;
    }
  });
};
/**
 * Launches countdowns and await promise to launch next.
 */


var awaitCountDown = function awaitCountDown() {
  var again, resolve;
  return regeneratorRuntime.async(function awaitCountDown$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // On enchaine les countdown si pas de pause
          again = true;

        case 1:
          if (!(durationList.length && again)) {
            _context.next = 18;
            break;
          }

          console.log("Liste durées : " + durationList);
          console.log("Liste exoName : " + exoNameList); //

          exoNameDisplay.innerText = exoNameList.shift(); // La Promise est résolue si fin du countdown ou pause

          _context.next = 7;
          return regeneratorRuntime.awrap(promiseCountDown());

        case 7:
          resolve = _context.sent;
          console.log("resolve : " + resolve);
          console.log("prochaine durée : " + durationList[0]);
          console.log("prochain exoName : " + exoNameList[0]);

          if (resolve) {
            _context.next = 16;
            break;
          }

          again = false;
          console.log("!result contenu durées: " + durationList);
          console.log("!result contenu exoName: " + exoNameList);
          return _context.abrupt("return", false);

        case 16:
          _context.next = 1;
          break;

        case 18:
          // On pourra remettre 5s au début si relance d'une timeline
          firstCountdown = true;

        case 19:
        case "end":
          return _context.stop();
      }
    }
  });
};