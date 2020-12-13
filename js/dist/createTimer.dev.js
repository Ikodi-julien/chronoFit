"use strict";

var _Interval = require("./classes/Interval.js");

/* --- CONSTANTES --- */
var addIntervalButton = document.querySelector("#addInterval");
var intervalNameInput = document.getElementById("intervalName");
var durationInput = document.getElementById("duration");
var intervalsContainer = document.getElementById("timerIntervals");
var readTimelineButton = document.getElementById("readTimelineButton");
var intervalsCompteur = 0;
/* --- LISTENER --- */

addIntervalButton.addEventListener("click", function () {
  // On récupère le nom et la durée de l'interval
  var intervalName = intervalNameInput.value;
  var intervalDuration = durationInput.value; // On créé un objet Interval avec id

  var interval = new _Interval.Interval("interval" + intervalsCompteur, intervalName, intervalDuration); // On ajoute l'interval dans le container d'intervals

  if (interval.duration) {
    intervalsContainer.appendChild(interval.createIntervalHtml()); // On créé une div droppable vide à la fin

    var dropableDiv = document.createElement("div");
    dropableDiv.classList.add("drop");
    dropableDiv.setAttribute("id", "empty__interval" + intervalsCompteur);
    dropableDiv.setAttribute("ondrop", "drop_handler(event)");
    dropableDiv.setAttribute("ondragover", "dragover_handler(event)");
    intervalsContainer.appendChild(dropableDiv); // on oubli pas d'incrémenter le compteur

    intervalsCompteur++;
  }
});
readTimelineButton.addEventListener("click"
/* Une fonction qui affiche la vue Chrono */
);