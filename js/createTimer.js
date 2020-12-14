import { Interval } from "./classes/Interval.js";
import { Chrono } from "./classes/Chrono.js";

/* --- CONSTANTES CREATE TIMER --- */
const addIntervalButton = document.querySelector("#addInterval");
const intervalNameInput = document.getElementById("intervalName");
const durationInput = document.getElementById("duration");
const intervalsContainer = document.getElementById("timerIntervals");

let intervalsCompteur = 0;

/* --- CONSTANTES READ TIMER--- */
const startCountDownButton = document.querySelector("#timerStartButton");
const stopChronoButton = document.querySelector("#timerPauseButton");
const display = document.getElementById("timerDisplay");
const goToReadTimelineButton = document.getElementById(
  "goToReadTimelineButton"
);

let intervalsCollection = null;
let durationList = [];
let isListening = false;
let isReading = false;
let timerPromise = 0;
let chronoId = [];
let firstCountdown = true;

/* --- LISTENER CREATE TIMER --- */
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

  // On ajoute l'interval dans le container d'intervals
  if (interval.duration) {
    intervalsContainer.appendChild(interval.createIntervalHtml());

    // On créé une div droppable vide à la fin
    let dropableDiv = document.createElement("div");
    dropableDiv.classList.add("drop");
    dropableDiv.setAttribute("id", "empty__interval" + intervalsCompteur);
    dropableDiv.setAttribute("ondrop", "drop_handler(event)");
    dropableDiv.setAttribute("ondragover", "dragover_handler(event)");
    intervalsContainer.appendChild(dropableDiv);

    // on oubli pas d'incrémenter le compteur
    intervalsCompteur++;
  }
});

/* --- LISTENER READ COUNTDOWN --- */
// Créé la liste des éléments à lire et affiche la vue countdown

goToReadTimelineButton.addEventListener("click", () => {
  // Toggle une classe qui fait apparaitre la vue du countdown
  // On récup les intervals à lire
  intervalsCollection = document.getElementsByClassName("interval");
  console.log("liste des éléments interval");
  console.log(intervalsCollection);

  // On récupère la durée des intervals à lire
  for (let i = 0; i < intervalsCollection.length; i++) {
    let duration = intervalsCollection.item(i).childNodes.item(1).innerText;
    durationList.push(duration);
  }
});

// Lance le countdown
startCountDownButton.addEventListener("click", () => {
  // On ajoute 5 secondes au début si c'est le premier démarrage
  if (firstCountdown) {
    durationList.unshift(5);
    firstCountdown = false;
  }
  console.log("Start, contenu liste : " + durationList);
  // On envoi la fonction asynchrone de CAR
  awaitCountDown();
});

// Eventlistener sur le "X" et le "<-"

/* --- FUNCTIONS READ COUNTDOWN --- */

/**
 * Promise awaited by awaitCountdown(),
 * Pause button = resolve(false)
 * Countdown ends = resolve(true)
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

        // On ajoute le temps restant au début de la liste
        durationList.unshift(stopTime);

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
 * Launches countdowns and await promise if paused or finished.
 */
const awaitCountDown = async function () {
  // On enchaine les countdown si pas de pause
  let again = true;

  while (durationList.length && again) {
    console.log("Taille liste durées : " + durationList);

    // La Promise est résolue si fin du countdown ou pause
    let resolve = await promiseCountDown();

    console.log("resolve : " + resolve);
    console.log("prochain : " + durationList[0]);

    if (!resolve) {
      again = false;
      console.log("!result contenu liste: " + durationList);

      return false;
    }
  }

  // On pourra remettre 5s au début si relance d'une timeline
  firstCountdown = true;
};
