import { Interval } from "./classes/Interval.js";

/* --- CONSTANTES --- */
const addIntervalButton = document.querySelector("#addInterval");
const intervalNameInput = document.getElementById("intervalName");
const durationInput = document.getElementById("duration");
const intervalsContainer = document.getElementById("timerIntervals");
const readTimelineButton = document.getElementById("readTimelineButton");

let intervalsCompteur = 0;

/* --- LISTENER --- */

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

readTimelineButton.addEventListener(
  "click" /* Une fonction qui affiche la vue Chrono */
);
