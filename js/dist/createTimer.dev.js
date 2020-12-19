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
var countDownDisplay = document.getElementById("timerDisplay");
var goToReadTimelineButton = document.getElementById("goToReadTimelineButton");
var exoNameDisplay = document.getElementById("exoNameDisplay");
var nextExoNameDisplay = document.getElementById("nextExoNameDisplay");
var timerReadClose = document.getElementById("timerReadClose");
var totalTimeDisplay = document.getElementById("totalTimeDisplay");
var previousCountdownBtn = document.getElementById("previousCountdown");
var nextCountdownBtn = document.getElementById("nextCountdown");
var intervalsCollection = null;
var durationList = [];
var exoNameList = [];
var chronoId = [];
var isStopped = false;
var isReading = false;
var isFirstCountdown = true;
var timerPromise = 0;
var timerTotalDuration = 0;
var click = new Event("click");
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
 * Create a Interval and add an Interval element to the timeline
 */

var addInterval = function addInterval() {
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
};
/**
 *  Rafraichie la liste des durées et des noms
 * @param {list} - La liste à rafraichir
 * @param {number} - L'index de l'item recherché
 **/


var refreshList = function refreshList(list, index) {
  console.log("Appel à refreshList"); // On commence par vider la liste de durées et noms, au cas où

  list = []; // On récup les intervals à lire

  intervalsCollection = document.getElementsByClassName("interval");

  if (intervalsCollection.length) {
    // On récupère la durée des intervals à lire
    for (var i = 0; i < intervalsCollection.length; i++) {
      var item = intervalsCollection.item(i).childNodes.item(index).innerText;
      list.push(item);
    }

    return list;
  }
};
/**
 * Additionne les durées des intervals
 * @param {listOfNumber} - Sum a list of numbers :-)
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
 * @param {list} - A list of numbers,
 */


var refreshTotalTime = function refreshTotalTime(durationList) {
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
 * Toggle class to show read page
 */


var goToReadTimeline = function goToReadTimeline() {
  // Toggle une classe qui fait apparaitre la vue du countdown
  console.log("Timeline validée");
  timerReadPage.classList.add("timer__read__show"); // Rafraichit les listes pour etre bien

  durationList = refreshList(durationList, 1);
  exoNameList = refreshList(exoNameList, 0); // Affiche le temps total et l'exo suivant

  totalTimeDisplay.innerText = newTotalTimeString(returnSum(durationList));
  nextExoNameDisplay.innerText = exoNameList[0];
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
 * Var : durationList, exoNameList, countdownTotal[], isReading, isFirstCountDown
 * Function : returnSum(), Chrono.countdown(), awaitCountdown()
 */


var startAllCountdowns = function startAllCountdowns() {
  // Déjà on ne continue que si pas déjà en train de lire
  if (!isReading) {
    // On ajoute 5 secondes de prépa "READY ?" au début si c'est le premier démarrage
    if (isFirstCountdown) {
      durationList.unshift(5);
      exoNameList.unshift("On y va dans...");
      isFirstCountdown = false;
    }

    console.log("Btn start, listes : " + durationList + " " + exoNameList + "total : " + timerTotalDuration); // Lecture countDown total, avant awaitCountDown qui agit sur durationList

    timerTotalDuration = returnSum(durationList);
    countdownTotal[0] = new _Chrono.Chrono(timerTotalDuration, totalTimeDisplay);
    countdownTotal[0].countDown(); // Lecture des intervalles

    awaitCountDown(); // On decoince le stop btn

    isStopped = false;
  }
};
/**
 * var : chronoId[], countdownTotal[], timerTotalDuration, isStopped, isReading
 */


var stopAllCountdowns = function stopAllCountdowns() {
  if (!isStopped) {
    // On arrête le chrono des intervalles
    isReading = pauseCountdown(chronoId[0]);
    chronoId = []; // Arrêt du countdown total et on vide la variable

    if (countdownTotal.length) {
      countdownTotal[0].stop();
      countdownTotal = [];
      timerTotalDuration = 0;
    } // Il y un eventListener dans la promise, pour mémoire
    // On évite de recréer un listener


    isStopped = true;
  }
};
/**
 * Dispatch an event "click" on stopChronButton, empty durationList[] and exoNameList[]
 */


var quitReadPage = function quitReadPage() {
  // On fait un pseudo event click sur pauseCountDownBtn
  stopChronoButton.dispatchEvent(new Event("click")); // On quitte la lecture, donc on vide les listes

  durationList = [];
  exoNameList = []; // On affiche des 00:00

  countDownDisplay.innerText = "00:00";
  totalTimeDisplay.innerText = "00:00"; // On permet les 5 sec au début

  isFirstCountdown = true; // On escamote la page lecture

  timerReadPage.classList.remove("timer__read__show");
  console.log("Quit : " + durationList + "/" + exoNameList);
};
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

var previousCountdown = function previousCountdown() {
  // Arrête les countdowns avec dispatch event pour la promise qui attend
  stopChronoButton.dispatchEvent(click); // Récupere la taille des listes duration et name

  var intervalsLength = durationList.length; // Refait les listes totales

  durationList = refreshList(durationList, 1);
  exoNameList = refreshList(exoNameList, 0); // Enlève des listes les intervalles inutiles

  while (durationList.length > intervalsLength + 1) {
    durationList.shift();
    exoNameList.shift();
  } // On récupère le temps total et on l'affiche


  totalTimeDisplay.innerText = newTotalTimeString(returnSum(durationList)); // On affiche nom et durée

  exoNameDisplay.innerText = exoNameList[0];

  if (exoNameList[1]) {
    nextExoNameDisplay.innerText = exoNameList[1];
  } else {
    nextExoNameDisplay.innerText = "C'est la fin !";
  }

  countDownDisplay.innerText = durationList[0]; // On permet 5s au démarrage

  isFirstCountdown = true;
};

var nextCountdown = function nextCountdown() {
  // Arrête les countdowns avec dispatch event pour la promise qui attend
  stopChronoButton.dispatchEvent(click); // Récupere la taille des listes duration et name

  var intervalsLength = durationList.length;

  if (intervalsLength > 1) {
    // Refait les listes totales
    durationList = refreshList(durationList, 1);
    exoNameList = refreshList(exoNameList, 0); // Enlève des listes les intervalles inutiles

    while (durationList.length > intervalsLength - 1) {
      durationList.shift();
      exoNameList.shift();
    } // On récupère le temps total et on l'affiche


    totalTimeDisplay.innerText = newTotalTimeString(returnSum(durationList)); // On affiche nom et durée

    exoNameDisplay.innerText = exoNameList[0];

    if (exoNameList[1]) {
      nextExoNameDisplay.innerText = exoNameList[1];
    } else {
      nextExoNameDisplay.innerText = "C'est la fin !";
    }

    countDownDisplay.innerText = durationList[0]; // On permet 5s au démarrage

    isFirstCountdown = true;
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
    var chrono = new _Chrono.Chrono(duration, countDownDisplay);
    chronoId.unshift(chrono); // Démarrage du CAR

    chronoId[0].countDown();
    isReading = true; // Timeout de la Promise

    if (isReading) {
      timerPromise = setTimeout(function () {
        isReading = false;
        resolve(true);
        console.log("La promesse est true");
        chronoId[0].stop();
        chronoId = [];
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
            _context.next = 15;
            break;
          }

          console.log("Liste durées : " + durationList);
          console.log("Liste exoName : " + exoNameList); // On affiche les exoNames

          exoNameDisplay.innerText = exoNameList.shift();
          nextExoNameDisplay.innerText = exoNameList[0]; // La Promise est résolue si fin du countdown ou pause

          _context.next = 8;
          return regeneratorRuntime.awrap(promiseCountDown());

        case 8:
          resolve = _context.sent;

          if (resolve) {
            _context.next = 13;
            break;
          }

          again = false;
          console.log("resolve = false, listes : " + durationList + " " + exoNameList);
          return _context.abrupt("return", false);

        case 13:
          _context.next = 1;
          break;

        case 15:
          nextExoNameDisplay.innerText = "Fini !"; // On pourra remettre 5s au début si relance d'une timeline

          isFirstCountdown = true;

        case 17:
        case "end":
          return _context.stop();
      }
    }
  });
};
/*------------------------------------------------------------*/

/*------------------------------------------------------------*/

/*------------------------------------------------------------*/


document.addEventListener("DOMContentLoaded", function () {
  /**
   * On affiche le temps total à chaque nouvel event "build"
   **/
  document.addEventListener("build", function () {
    durationList = refreshList(durationList, 1);
    exoNameList = refreshList(exoNameList, 0);
    refreshTotalTime(durationList);
  });
  addIntervalButton.addEventListener("click", addInterval);
  goToReadTimelineButton.addEventListener("click", goToReadTimeline);
  startCountDownButton.addEventListener("click", startAllCountdowns);
  stopChronoButton.addEventListener("click", stopAllCountdowns);
  timerReadClose.addEventListener("click", quitReadPage);
  previousCountdownBtn.addEventListener("click", previousCountdown);
  nextCountdownBtn.addEventListener("click", nextCountdown);
});