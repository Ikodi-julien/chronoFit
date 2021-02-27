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
const countDownDisplay = document.getElementById("timerDisplay");
const goToReadTimelineButton = document.getElementById(
  "goToReadTimelineButton"
);
const exoNameDisplay = document.getElementById("exoNameDisplay");
const nextExoNameDisplay = document.getElementById("nextExoNameDisplay");
const timerReadClose = document.getElementById("timerReadClose");
const totalTimeDisplay = document.getElementById("totalTimeDisplay");
const previousCountdownBtn = document.getElementById("previousCountdown");
const nextCountdownBtn = document.getElementById("nextCountdown");

let intervalsCollection = null;
let durationList = [];
let exoNameList = [];
let chronoId = [];
let isStopped = false;
let isReading = false;
let isFirstCountdown = true;
let timerPromise = 0;
let timerTotalDuration = 0;

const click = new Event("click");
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
const addInterval = () => {
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
};

/**
 *  Rafraichie la liste des durées et des noms
 * @param {list} - La liste à rafraichir
 * @param {number} - L'index de l'item recherché
 **/
const refreshList = (list, index) => {
  console.log("Appel à refreshList");

  // On commence par vider la liste de durées et noms, au cas où
  list = [];

  // On récup les intervals à lire
  intervalsCollection = document.getElementsByClassName("interval");

  if (intervalsCollection.length) {
    // On récupère la durée des intervals à lire
    for (let i = 0; i < intervalsCollection.length; i++) {
      let item = intervalsCollection.item(i).childNodes.item(index).innerText;
      list.push(item);
    }

    return list;
  }
};

/**
 * Additionne les durées des intervals
 * @param {listOfNumber} - Sum a list of numbers :-)
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
 * @param {list} - A list of numbers,
 */
const refreshTotalTime = (durationList) => {
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
 * Toggle class to show read page
 */
const goToReadTimeline = () => {
  // Toggle une classe qui fait apparaitre la vue du countdown
  // Si on a au moins une durée
  durationList = refreshList(durationList, 1);
  exoNameList = refreshList(exoNameList, 0);

  if (durationList.length) {
    console.log("Timeline validée");
    timerReadPage.classList.add("timer__read__show");

    // Affiche le temps total et l'exo suivant
    totalTimeDisplay.innerText = newTotalTimeString(returnSum(durationList));
    nextExoNameDisplay.innerText = exoNameList[0];
  }
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
 * @param {void} - Displays current and next exoName as well as interval duration
 */
const displayCurrentAndNextNameAndIntervalTime = (
  durationList,
  exoNameList
) => {
  exoNameDisplay.innerText = exoNameList[0];
  if (exoNameList[1]) {
    nextExoNameDisplay.innerText = exoNameList[1];
  } else {
    nextExoNameDisplay.innerText = "C'est la fin !";
  }
  countDownDisplay.innerText = durationList[0];
};

/**
 * Var : durationList, exoNameList, countdownTotal[], isReading, isFirstCountDown
 * Function : returnSum(), Chrono.countdown(), awaitCountdown()
 */
const startAllCountdowns = () => {
  // Déjà on ne continue que si pas déjà en train de lire

  if (!isReading) {
    // On ajoute 5 secondes de prépa "READY ?" au début si c'est le premier démarrage

    if (isFirstCountdown) {
      durationList.unshift(5);
      exoNameList.unshift("On y va dans...");
      isFirstCountdown = false;
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

    timerTotalDuration = returnSum(durationList);
    countdownTotal[0] = new Chrono(timerTotalDuration, totalTimeDisplay);
    countdownTotal[0].countDown();
    // Lecture des intervalles

    awaitCountDown();
    // On decoince le stop btn

    isStopped = false;
  }
};

/**
 * var : chronoId[], countdownTotal[], timerTotalDuration, isStopped, isReading
 */
const stopAllCountdowns = () => {
  if (!isStopped) {
    // On arrête le chrono des intervalles

    isReading = pauseCountdown(chronoId[0]);
    chronoId = [];

    // Arrêt du countdown total et on vide la variable
    if (countdownTotal.length) {
      countdownTotal[0].stop();
      countdownTotal = [];
      timerTotalDuration = 0;
    }

    // Il y un eventListener dans la promise, pour mémoire

    // On évite de recréer un listener
    isStopped = true;
  }
};

/**
 * Dispatch an event "click" on stopChronButton, empty durationList[] and exoNameList[]
 */
const quitReadPage = () => {
  // On fait un pseudo event click sur pauseCountDownBtn

  stopChronoButton.dispatchEvent(new Event("click"));

  // On quitte la lecture, donc on vide les listes

  durationList = [];
  exoNameList = [];

  // On affiche des 00:00
  countDownDisplay.innerText = "00:00";
  totalTimeDisplay.innerText = "00:00";
  exoNameDisplay.innerText = "";

  // On permet les 5 sec au début
  isFirstCountdown = true;

  // On escamote la page lecture
  timerReadPage.classList.remove("timer__read__show");

  console.log("Quit : " + durationList + "/" + exoNameList);
};

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

const previousCountdown = () => {
  // Arrête les countdowns avec dispatch event pour la promise qui attend
  stopChronoButton.dispatchEvent(click);

  // Récupere la taille des listes duration et name
  let intervalsLength = durationList.length;

  // Refait les listes totales
  durationList = refreshList(durationList, 1);
  exoNameList = refreshList(exoNameList, 0);

  // Enlève des listes les intervalles inutiles
  while (durationList.length > intervalsLength + 1) {
    durationList.shift();
    exoNameList.shift();
  }

  // On récupère le temps total et on l'affiche
  totalTimeDisplay.innerText = newTotalTimeString(returnSum(durationList));

  // On affiche nom et durée
  displayCurrentAndNextNameAndIntervalTime(durationList, exoNameList);

  // On permet 5s au démarrage
  isFirstCountdown = true;
};

const nextCountdown = () => {
  // Arrête les countdowns avec dispatch event pour la promise qui attend
  stopChronoButton.dispatchEvent(click);

  // Récupere la taille des listes duration et name
  let intervalsLength = durationList.length;

  if (intervalsLength > 1) {
    // Refait les listes totales
    durationList = refreshList(durationList, 1);
    exoNameList = refreshList(exoNameList, 0);

    // Enlève des listes les intervalles inutiles
    while (durationList.length > intervalsLength - 1) {
      durationList.shift();
      exoNameList.shift();
    }

    // On récupère le temps total et on l'affiche
    totalTimeDisplay.innerText = newTotalTimeString(returnSum(durationList));

    // On affiche nom et durée
    displayCurrentAndNextNameAndIntervalTime(durationList, exoNameList);

    // On permet 5s au démarrage
    isFirstCountdown = true;
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
    let chrono = new Chrono(duration, countDownDisplay);
    chronoId.unshift(chrono);

    // On oublie pas d'enlever le nom de l'exo aussi dans sa liste
    exoNameList.shift();

    // Démarrage du CAR
    chronoId[0].countDown();
    isReading = true;

    // Timeout de la Promise
    if (isReading) {
      timerPromise = setTimeout(() => {
        isReading = false;
        resolve(true);
        console.log("La promesse est true");
        chronoId[0].stop();
        chronoId = [];
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
const awaitCountDown = async () => {
  // On enchaine les countdown si pas de pause
  let again = true;

  while (durationList.length && again) {
    console.log("Liste durées : " + durationList);
    console.log("Liste exoName : " + exoNameList);

    // On affiche les exoNames
    // durationList = refreshList(durationList, 1);
    // exoNameList = refreshList(exoNameList, 0);
    displayCurrentAndNextNameAndIntervalTime(durationList, exoNameList);

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

  nextExoNameDisplay.innerText = "Fini !";

  // On pourra remettre 5s au début si relance d'une timeline
  isFirstCountdown = true;
};

/*------------------------------------------------------------*/
/*------------------------------------------------------------*/
/*------------------------------------------------------------*/

document.addEventListener("DOMContentLoaded", () => {
  /**
   * On affiche le temps total à chaque nouvel event "build"
   **/
  document.addEventListener("build", () => {
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
