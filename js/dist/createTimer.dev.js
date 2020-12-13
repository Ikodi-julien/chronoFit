"use strict";

var _Interval = require("./classes/Interval.js");

var addIntervalButton = document.querySelector('#addInterval');
var intervalNameInput = document.getElementById('intervalName');
var durationInput = document.getElementById('duration');
var intervalsContainer = document.getElementById('timerIntervals');
var readTimelineButton = document.getElementById('readTimelineButton');
var intervalsCompteur = 0;
/* --- LISTENER --- */

addIntervalButton.addEventListener('click', function () {
  // On récupère le nom et la durée de l'interval
  var intervalName = intervalNameInput.value;
  var intervalDuration = durationInput.value; // On créé un objet Interval avec id

  var interval = new _Interval.Interval('interval' + intervalsCompteur, intervalName, intervalDuration); // On ajoute l'interval dans le container d'intervals

  if (interval.duration) {
    intervalsContainer.appendChild(interval.createIntervalHtml()); // On créé une div droppable vide à la fin

    var dropableDiv = document.createElement('div');
    dropableDiv.classList.add('drop');
    dropableDiv.setAttribute('id', 'empty__interval' + intervalsCompteur);
    dropableDiv.setAttribute('ondrop', 'drop_handler(event)');
    dropableDiv.setAttribute('ondragover', 'dragover_handler(event)');
    intervalsContainer.appendChild(dropableDiv); // on oubli pas d'incrémenter le compteur

    intervalsCompteur++;
  }
});
readTimelineButton.addEventListener('click', validateTimeline);
/* --- FUNCTIONS --- */

/**
 * Get the names and durations and make a string with it.
 */

function timelineToString() {
  var timelineData = document.getElementById('timelineData');
  var timelineDataString = '['; // On récupère les éléments contenant les noms et durées des intervalles

  var intervalNameCollection = document.getElementsByClassName('intervalName');
  var intervalDurationCollection = document.getElementsByClassName('intervalDuration'); // On en fait une liste

  for (var i = 0; i < intervalNameCollection.length; i++) {
    var divName = intervalNameCollection.item(i);
    var divDuration = intervalDurationCollection.item(i);
    console.log(divName);
    console.log(divDuration);
    timelineDataString = timelineDataString + '"' + divName.innerText + '", "' + divDuration.innerText + '" ,';
  }

  timelineDataString = timelineDataString + ']'; // On l'affiche dans une div en vue de récup par PHP

  timelineData.innerText = timelineDataString;
}
/**
 *  Ask for validation before sending the string (intervals's name and duration) to PHP
 */


function validateTimeline() {
  timelineToString(); // ToDo :
  //    - Faire un élément qui apparait avec bouton pour validation
  //    - Faire en sorte que le bouton qui apparait soit un submit pour POST de la string
}