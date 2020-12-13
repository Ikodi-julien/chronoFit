"use strict";

/**
 * Get the names and durations and make a string with it.
 */
function timelineToString() {
  var timelineData = document.getElementById("timelineData");
  var timelineDataString = "["; // On récupère les éléments contenant les noms et durées des intervalles

  var intervalNameCollection = document.getElementsByClassName("intervalName");
  var intervalDurationCollection = document.getElementsByClassName("intervalDuration"); // On en fait une liste

  for (var i = 0; i < intervalNameCollection.length; i++) {
    var divName = intervalNameCollection.item(i);
    var divDuration = intervalDurationCollection.item(i);
    console.log(divName);
    console.log(divDuration);
    timelineDataString = timelineDataString + '"' + divName.innerText + '", "' + divDuration.innerText + '" ,';
  }

  timelineDataString = timelineDataString + "]"; // On l'affiche dans une div en vue de récup par PHP

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