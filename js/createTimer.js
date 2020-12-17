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

let intervalsCollection = null;
let durationList = [];
let exoNameList = [];
let chronoId = [];
let isListening = false;
let isReading = false;
let firstCountdown = true;
let timerPromise = 0;

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

      // On rafraichit les listes de durées et noms
      refreshDurationsAndNames();

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

  // Créé la liste des éléments à lire et affiche la vue countdown
  goToReadTimelineButton.addEventListener("click", () => {
    // Toggle une classe qui fait apparaitre la vue du countdown
    timerReadPage.classList.add("timer__read__show");
    refreshDurationsAndNames();
  });

  // EventListener pour revenir à la page de création (le "X")
  timerReadClose.addEventListener("click", () => {
    timerReadPage.classList.remove("timer__read__show");
  });

  // Lance le countdown
  startCountDownButton.addEventListener("click", () => {
    // On ajoute 5 secondes de prépa "READY ?" au début si c'est le premier démarrage
    if (firstCountdown) {
      durationList.unshift(5);
      exoNameList.unshift("READY ?");
      firstCountdown = false;
    }
    console.log("Start, contenu durées : " + durationList);
    console.log("Start, contenu exoName : " + exoNameList);
    // On envoi la fonction asynchrone de CAR
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
const refreshDurationsAndNames = () => {
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
const sumIntervalsTimes = () => {
  let timelineTotalDuration = 0;

  for (let i = 0; i < durationList.length; i++) {
    timelineTotalDuration += parseInt(durationList[i]);
  }

  return timelineTotalDuration;
};

/**
 * Rafraichi l'affichage du temps total
 */
const refreshTotalTime = () => {
  let timelineTotalDuration = sumIntervalsTimes();
  console.log(
    "Durée totale depuis refreshTotalTime : " + timelineTotalDuration
  );
  totalTimePreview.innerText = newTotalTimeString(timelineTotalDuration);
};

/**
 * Create a string to display from seconds,
 * Exemple : 157 s => 02:37
 */
const newTotalTimeString = (totalDuration) => {
  let unitMin = Math.floor((totalDuration / 60) % 10);
  let tenMin = Math.floor(totalDuration / 600);

  let unitSec = Math.floor((totalDuration % 60) % 10);
  let tenSec = Math.floor((totalDuration % 60) / 10);

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
        chronoId = [];
        console.log("La promesse est true");
      }, duration * 1000 + 1000);
    }

    // Fonction appelée en cas de pause du countdown
    const pauseCountdown = () => {
      if (isReading) {
        // On arrête le chrono
        let stopTime = chronoId[0].stop();
        isReading = false;
        console.log("Pause, temps récup : " + stopTime);

        // On ajoute le temps restant et le nom au début de la liste
        durationList.unshift(stopTime);
        exoNameList.unshift(exoNameDisplay.innerText);

        // On clear la Promise
        clearTimeout(timerPromise);
        console.log("DurationList après unshift() : " + durationList);
        resolve(false);
      }
    };

    // Création listener pour arrêt du chrono
    if (!isListening) {
      stopChronoButton.addEventListener("click", pauseCountdown);
      isListening = true;
    }
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

    console.log("resolve : " + resolve);
    console.log("prochaine durée : " + durationList[0]);
    console.log("prochain exoName : " + exoNameList[0]);

    if (!resolve) {
      again = false;
      console.log("!result contenu durées: " + durationList);
      console.log("!result contenu exoName: " + exoNameList);

      return false;
    }
  }

  // On pourra remettre 5s au début si relance d'une timeline
  firstCountdown = true;
};
