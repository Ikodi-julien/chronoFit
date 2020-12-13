import { Chrono } from "./classes/Chrono.js";

/* --- CONSTANTES --- */
const startCountDownButton = document.querySelector("#timerStartButton");
const stopChronoButton = document.querySelector("#timerStopButton");
const display = document.getElementById("timerDisplay");

let durationList = [];

/* --- LISTENER --- */

startCountDownButton.addEventListener("click", () => {
  // On récup les intervals à lire
  let intervalsCollection = document.getElementsByClassName("interval");
  console.log(intervalsCollection);

  // On récupère la durée des intervals à lire
  for (let i = 0; i < intervalsCollection.length; i++) {
    let duration = intervalsCollection.item(i).childNodes.item(1).innerText;
    durationList.push(duration);
  }

  console.log("durée du 1er : " + durationList[0]);
  // On envoi la fonction asynchrone de CAR
  awaitCountDown(durationList);
});

const promiseCountDown = function (durationList) {
  return new Promise((resolve) => {
    // Création d'un chrono chargé de cet interval
    let duration = durationList.shift();
    const chrono = new Chrono(duration, display);

    // Création listener pour arrêt du chrono
    stopChronoButton.addEventListener("click", () => {
      let stopTime = chrono.stop();
      console.log("temps récup : " + stopTime);
      durationList.unshift(stopTime);
      clearTimeout(timerPromise);
      resolve(false);
    });
    // Démarrage du CAR
    chrono.countDown();

    let timerPromise = setTimeout(function () {
      resolve(true);
      console.log("La promesse countDown est terminée " + chrono.startTime);
    }, chrono.startTime * 1000 + 1000);
  });
};

const awaitCountDown = async function (durationList) {
  while (durationList.length) {
    console.log("Taille liste durées : " + durationList.length);

    let result = await promiseCountDown(durationList);

    console.log("prochain : " + durationList[0]);

    if (!result) {
      durationList = [];
      console.log("Taille liste !result : " + durationList.length);
    }
  }
};
