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
var intervalsCompteur = 0;
var countdownTotal = []; // On créé un ojet event, sera lancer pour déclencher les rafraichissements

var event = new Event("build");
/* --- CONSTANTES READ TIMER--- */

var startCountDownButton = document.querySelector("#timerStartButton");
var stopChronoButton = document.querySelector("#timerPauseButton");
var display = document.getElementById("timerDisplay");
var goToReadTimelineButton = document.getElementById("goToReadTimelineButton");
var exoNameDisplay = document.getElementById("exoNameDisplay");
var timerReadClose = document.getElementById("timerReadClose");
var totalTimeDisplay = document.getElementById("totalTimeDisplay");
var intervalsCollection = null;
var durationList = [];
var exoNameList = [];
var chronoId = [];
var isStopped = false;
var isReading = false;
var firstCountdown = true;
var timerPromise = 0;
var timerTotalDuration = 0;
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
  console.log("Appel à refreshDurationsAndNames"); // On commence par vider la liste de durées et noms, au cas où

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


var returnSum = function returnSum(listOfNumber) {
  var sum = 0;

  for (var i = 0; i < listOfNumber.length; i++) {
    sum += parseInt(listOfNumber[i]);
  }

  return sum;
};
/**
 * Rafraichi l'affichage du temps total
 */


var refreshTotalTime = function refreshTotalTime() {
  var sumTimes = returnSum(durationList);
  totalTimePreview.innerText = newTotalTimeString(sumTimes);
  console.log("Appel à refreshTotalTime, nb sec : " + sumTimes);
};
/**
 * Create a string to display from seconds,
 * Exemple : 157 s => 02:37
 */


var newTotalTimeString = function newTotalTimeString(duration) {
  var unitMin = Math.floor(duration / 60 % 10);
  var tenMin = Math.floor(duration / 600);
  var unitSec = Math.floor(duration % 60 % 10);
  var tenSec = Math.floor(duration % 60 / 10);
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
 * Stops a chrono or countdown
 * @param {Chrono} chrono - use Chrono.stop()
 */


var pauseCountdown = function pauseCountdown(chrono) {
  if (isReading) {
    // On arrête le chrono
    var stopTime = chrono.stop();
    isReading = false;
    console.log("Pause, temps récup : " + stopTime); // On ajoute le temps restant et le nom au début de la liste

    durationList.unshift(stopTime);
    exoNameList.unshift(exoNameDisplay.innerText); // On dit que ça ne lit plus

    return false;
  }
};
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
        chronoId[0].stop();
        chronoId = [];
        console.log("La promesse est true");
      }, duration * 1000);
    } // Listener pour resolve = false


    stopChronoButton.addEventListener("click", function () {
      setTimeout(function () {
        clearTimeout(timerPromise);
        resolve(false);
      }, 100);
    });
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
            _context.next = 14;
            break;
          }

          console.log("Liste durées : " + durationList);
          console.log("Liste exoName : " + exoNameList); //

          exoNameDisplay.innerText = exoNameList.shift(); // La Promise est résolue si fin du countdown ou pause

          _context.next = 7;
          return regeneratorRuntime.awrap(promiseCountDown());

        case 7:
          resolve = _context.sent;

          if (resolve) {
            _context.next = 12;
            break;
          }

          again = false;
          console.log("resolve = false, listes : " + durationList + " " + exoNameList);
          return _context.abrupt("return", false);

        case 12:
          _context.next = 1;
          break;

        case 14:
          // On pourra remettre 5s au début si relance d'une timeline
          firstCountdown = true;

        case 15:
        case "end":
          return _context.stop();
      }
    }
  });
}; // Listeners


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
    console.log("click sur addIntervalButton"); // On récupère le nom et la durée de l'interval

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

      intervalsCompteur++; // On envoi un event pour le recalcul du temps total

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

  /**
   * Créé la liste des éléments à lire et affiche la vue countdown
   */

  goToReadTimelineButton.addEventListener("click", function () {
    // Toggle une classe qui fait apparaitre la vue du countdown
    console.log("Timeline validée");
    timerReadPage.classList.add("timer__read__show"); // Rafraichit les listes pour etre bien

    refreshDurationsAndNames(); // Affiche le temps total

    totalTimeDisplay.innerText = newTotalTimeString(returnSum(durationList));
  });
  /**
   * Lance le countdown
   */

  startCountDownButton.addEventListener("click", function () {
    // Déjà on ne continue que si pas déjà en train de lire
    if (!isReading) {
      // On ajoute 5 secondes de prépa "READY ?" au début si c'est le premier démarrage
      if (firstCountdown) {
        durationList.unshift(5);
        exoNameList.unshift("READY ?");
        firstCountdown = false;
      }

      console.log("Btn start, listes : " + durationList + " " + exoNameList + "total : " + timerTotalDuration); // Lecture countDown total, avant awaitCountDown qui agit sur durationList

      timerTotalDuration += returnSum(durationList);
      countdownTotal[0] = new _Chrono.Chrono(timerTotalDuration, totalTimeDisplay);
      countdownTotal[0].countDown(); // Lecture des intervalles

      awaitCountDown(); // On decoince le stop btn

      isStopped = false;
    }
  }); // Création listener pour arrêt du chrono

  stopChronoButton.addEventListener("click", function () {
    if (!isStopped) {
      // On arrête le chrono des intervalles
      isReading = pauseCountdown(chronoId[0]);
      chronoId = []; // Arrêt du countdown total et on vide la variable

      countdownTotal[0].stop();
      countdownTotal = [];
      timerTotalDuration = 0; // Il y un eventListener dans la promise, pour mémoire
      // On évite de recréer un listener

      isStopped = true;
    }
  }); // EventListener pour revenir à la page de création (le "X")

  timerReadClose.addEventListener("click", function () {
    // On fait un pseudo event click sur pauseCountDownBtn
    stopChronoButton.dispatchEvent(new Event("click")); // On quitte la lecture, donc on vide les listes

    durationList = [];
    exoNameList = []; // On affiche des 00:00

    display.innerText = "00:00";
    totalTimeDisplay.innerText = "00:00"; // On permet les 5 sec au début

    firstCountdown = true; // On escamote la page lecture

    timerReadPage.classList.remove("timer__read__show");
    console.log("Quit : " + durationList + "/" + exoNameList);
  });
});