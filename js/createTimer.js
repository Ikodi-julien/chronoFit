import { Interval } from "./classes/Interval.js";
import { Chrono } from "./classes/Chrono.js";

/* --- CONSTANTES CREATE TIMER --- */
const addIntervalButton = document.querySelector("#addInterval");
const intervalNameInput = document.getElementById("intervalName");
const durationInput = document.getElementById("duration");
const intervalsContainer = document.getElementById("timerIntervals");
const totalTimePreview = document.getElementById("totalTimePreview");
const timerReadPage = document.getElementById("timerRead");

let intervalsCompteur = 0;
let countdownTotal = [];
// On créé un ojet event, sera lancer pour déclencher les rafraichissements
let event = new Event("build");

/* --- CONSTANTES READ TIMER--- */
const startCountDownButton = document.querySelector("#timerStartButton");
const stopChronoButton = document.querySelector("#timerPauseButton");
const display = document.getElementById("timerDisplay");
const goToReadTimelineButton = document.getElementById(
  "goToReadTimelineButton"
);
const exoNameDisplay = document.getElementById("exoNameDisplay");
const timerReadClose = document.getElementById("timerReadClose");
const totalTimeDisplay = document.getElementById("totalTimeDisplay");

let intervalsCollection = null;
let durationList = [];
let exoNameList = [];
let chronoId = [];
let isStopped = false;
let isReading = false;
let firstCountdown = true;
let timerPromise = 0;
let timerTotalDuration = 0;

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
const refreshDurationsAndNames = () => {
  console.log("Appel à refreshDurationsAndNames");

  // On commence par vider la liste de durées et noms, au cas où
  durationList = [];
  exoNameList = [];

  // On récup les intervals à lire
  intervalsCollection = document.getElementsByClassName("interval");
  // console.log("liste des éléments interval");
  // console.log(intervalsCollection);

  if (intervalsCollection.length) {
    // On récupère la durée des intervals à lire
    for (let i = 0; i < intervalsCollection.length; i++) {
      let duration = intervalsCollection.item(i).childNodes.item(1).innerText;
      durationList.push(duration);
    }

    // On récupère les noms des intervals à lire
    for (let i = 0; i < intervalsCollection.length; i++) {
      let exoName = intervalsCollection.item(i).childNodes.item(0).innerText;
      exoNameList.push(exoName);
    }
  }
};

/**
 * Additionne les durées des intervals
 */
const returnSum = (listOfNumber) => {
  let sum = 0;
  for (let i = 0; i < listOfNumber.length; i++) {
    sum += parseInt(listOfNumber[i]);
  }

  return sum;
};

/**
 * Rafraichi l'affichage du temps total
 */
const refreshTotalTime = () => {
  let sumTimes = returnSum(durationList);
  totalTimePreview.innerText = newTotalTimeString(sumTimes);
  console.log("Appel à refreshTotalTime, nb sec : " + sumTimes);
};

/**
 * Create a string to display from seconds,
 * Exemple : 157 s => 02:37
 */
const newTotalTimeString = (duration) => {
  let unitMin = Math.floor((duration / 60) % 10);
  let tenMin = Math.floor(duration / 600);

  let unitSec = Math.floor((duration % 60) % 10);
  let tenSec = Math.floor((duration % 60) / 10);

  let string = tenMin + "" + unitMin + ":" + tenSec + "" + unitSec;

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
const pauseCountdown = (chrono) => {
  if (isReading) {
    // On arrête le chrono
    let stopTime = chrono.stop();
    isReading = false;
    console.log("Pause, temps récup : " + stopTime);

    // On ajoute le temps restant et le nom au début de la liste
    durationList.unshift(stopTime);
    exoNameList.unshift(exoNameDisplay.innerText);

    // On dit que ça ne lit plus
    return false;
  }
};

/**
 * Promise awaited by awaitCountdown(),
 * Click pause button => resolve(false)
 * Countdown ends => resolve(true)
 */
const promiseCountDown = () => {
  return new Promise((resolve) => {
    // Création d'un chrono chargé de cet interval
    let duration = durationList.shift();
    let chrono = new Chrono(duration, display);
    chronoId.unshift(chrono);

    // Démarrage du CAR
    chronoId[0].countDown();
    isReading = true;

    // Timeout de la Promise
    if (isReading) {
      timerPromise = setTimeout(() => {
        isReading = false;
        resolve(true);
        chronoId[0].stop();
        chronoId = [];
        console.log("La promesse est true");
      }, duration * 1000);
    }

    // Listener pour resolve = false

    stopChronoButton.addEventListener("click", () => {
      setTimeout(() => {
        clearTimeout(timerPromise);
        resolve(false);
      }, 100);
    });
  });
};

/**
 * Launches countdowns and await promise to launch next.
 */
const awaitCountDown = async function () {
  // On enchaine les countdown si pas de pause
  let again = true;

  while (durationList.length && again) {
    console.log("Liste durées : " + durationList);
    console.log("Liste exoName : " + exoNameList);

    //
    exoNameDisplay.innerText = exoNameList.shift();

    // La Promise est résolue si fin du countdown ou pause
    let resolve = await promiseCountDown();

    if (!resolve) {
      again = false;
      console.log(
        "resolve = false, listes : " + durationList + " " + exoNameList
      );

      return false;
    }
  }
  // On pourra remettre 5s au début si relance d'une timeline
  firstCountdown = true;
};

// Listeners
document.addEventListener("DOMContentLoaded", () => {
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

  addIntervalButton.addEventListener("click", () => {
    console.log("click sur addIntervalButton");

    // On récupère le nom et la durée de l'interval
    let intervalName = intervalNameInput.value;
    let intervalDuration = durationInput.value;

    // On créé un objet Interval avec id
    let interval = new Interval(
      "interval" + intervalsCompteur,
      intervalName,
      intervalDuration
    );

    if (interval.duration) {
      // On ajoute l'interval dans le container d'intervals
      intervalsContainer.appendChild(interval.createIntervalHtml());

      // On créé une div droppable vide à la fin
      let dropableDiv = document.createElement("div");
      dropableDiv.classList.add("drop");
      dropableDiv.setAttribute("id", "empty__interval" + intervalsCompteur);
      dropableDiv.setAttribute("ondrop", "drop_handler(event)");
      dropableDiv.setAttribute("ondragover", "dragover_handler(event)");
      dropableDiv.setAttribute("ondragleave", "dragleave_handler(event)");
      intervalsContainer.appendChild(dropableDiv);

      // on oubli pas d'incrémenter le compteur
      intervalsCompteur++;

      // On envoi un event pour le recalcul du temps total
      document.dispatchEvent(event);
    }
  });

  // On affiche le temps total à chaque nouvel event "build"
  document.addEventListener("build", () => {
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
  goToReadTimelineButton.addEventListener("click", () => {
    // Toggle une classe qui fait apparaitre la vue du countdown

    console.log("Timeline validée");
    timerReadPage.classList.add("timer__read__show");

    // Rafraichit les listes pour etre bien
    refreshDurationsAndNames();

    // Affiche le temps total
    totalTimeDisplay.innerText = newTotalTimeString(returnSum(durationList));
  });

  /**
   * Lance le countdown
   */
  startCountDownButton.addEventListener("click", () => {
    // Déjà on ne continue que si pas déjà en train de lire

    if (!isReading) {
      // On ajoute 5 secondes de prépa "READY ?" au début si c'est le premier démarrage

      if (firstCountdown) {
        durationList.unshift(5);
        exoNameList.unshift("READY ?");
        firstCountdown = false;
      }

      console.log(
        "Btn start, listes : " +
          durationList +
          " " +
          exoNameList +
          "total : " +
          timerTotalDuration
      );
      // Lecture countDown total, avant awaitCountDown qui agit sur durationList

      timerTotalDuration += returnSum(durationList);
      countdownTotal[0] = new Chrono(timerTotalDuration, totalTimeDisplay);
      countdownTotal[0].countDown();
      // Lecture des intervalles

      awaitCountDown();
      // On decoince le stop btn

      isStopped = false;
    }
  });

  // Création listener pour arrêt du chrono

  stopChronoButton.addEventListener("click", () => {
    if (!isStopped) {
      // On arrête le chrono des intervalles

      isReading = pauseCountdown(chronoId[0]);
      chronoId = [];

      // Arrêt du countdown total et on vide la variable

      countdownTotal[0].stop();
      countdownTotal = [];
      timerTotalDuration = 0;

      // Il y un eventListener dans la promise, pour mémoire

      // On évite de recréer un listener
      isStopped = true;
    }
  });

  // EventListener pour revenir à la page de création (le "X")
  timerReadClose.addEventListener("click", () => {
    // On fait un pseudo event click sur pauseCountDownBtn

    stopChronoButton.dispatchEvent(new Event("click"));

    // On quitte la lecture, donc on vide les listes

    durationList = [];
    exoNameList = [];

    // On affiche des 00:00
    display.innerText = "00:00";
    totalTimeDisplay.innerText = "00:00";

    // On permet les 5 sec au début
    firstCountdown = true;

    // On escamote la page lecture
    timerReadPage.classList.remove("timer__read__show");

    console.log("Quit : " + durationList + "/" + exoNameList);
  });
});
