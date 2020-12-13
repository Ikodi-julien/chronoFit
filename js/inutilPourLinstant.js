/**
 * Get the names and durations and make a string with it.
 */
function timelineToString() {
  const timelineData = document.getElementById("timelineData");
  let timelineDataString = "[";

  // On récupère les éléments contenant les noms et durées des intervalles
  const intervalNameCollection = document.getElementsByClassName(
    "intervalName"
  );
  const intervalDurationCollection = document.getElementsByClassName(
    "intervalDuration"
  );

  // On en fait une liste

  for (let i = 0; i < intervalNameCollection.length; i++) {
    let divName = intervalNameCollection.item(i);
    let divDuration = intervalDurationCollection.item(i);

    console.log(divName);
    console.log(divDuration);

    timelineDataString =
      timelineDataString +
      '"' +
      divName.innerText +
      '", "' +
      divDuration.innerText +
      '" ,';
  }

  timelineDataString = timelineDataString + "]";

  // On l'affiche dans une div en vue de récup par PHP
  timelineData.innerText = timelineDataString;
}

/**
 *  Ask for validation before sending the string (intervals's name and duration) to PHP
 */
function validateTimeline() {
  timelineToString();

  // ToDo :
  //    - Faire un élément qui apparait avec bouton pour validation
  //    - Faire en sorte que le bouton qui apparait soit un submit pour POST de la string
}
