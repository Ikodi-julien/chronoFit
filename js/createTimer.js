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
  console.log("durée du 1er : " + durationList[0]);
  // On envoi la fonction asynchrone de CAR
  awaitCountDown(durationList);
});

// Eventlistener sur le "X" et le "<-"

/* --- FUNCTIONS READ COUNTDOWN --- */
const promiseCountDown = function (durationList) {
  return new Promise((resolve) => {
    // Création d'un chrono chargé de cet interval
    let duration = durationList.shift();
    const chrono = new Chrono(duration, display);

    // Démarrage du CAR
    chrono.countDown();

    // Timeout de la Promise
    let timerPromise = setTimeout(function () {
      resolve(true);
      console.log("La promesse countDown est terminée " + chrono.startTime);
    }, duration * 1000 + 1000);

    // Fonction appelée en cas de pause du countdown
    const pauseCountdown = () => {
      let stopTime = chrono.stop();
      console.log("temps récup : " + stopTime);
      durationList.unshift(stopTime);
      clearTimeout(timerPromise);
      resolve(false);
    };

    // Création listener pour arrêt du chrono
    if (!isListening) {
      stopChronoButton.addEventListener("click", pauseCountdown);
      isListening = true;
    }
  });
};

const awaitCountDown = async function (durationList) {
  let again = true;

  while (durationList.length && again) {
    console.log("Taille liste durées : " + durationList.length);

    let resolve = await promiseCountDown(durationList);

    console.log("resolve : " + resolve);
    console.log("prochain : " + durationList[0]);

    if (!resolve) {
      again = false;
      console.log("Taille liste !result : " + durationList.length);

      return false;
    }
  }

  return durationList.length;
};
