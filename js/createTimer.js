import { Interval } from './classes/Interval.js'

/* --- CONSTANTES --- */
const addIntervalButton = document.querySelector('#addInterval')
const intervalNameInput = document.getElementById('intervalName')
const durationInput = document.getElementById('duration')
const intervalsContainer = document.getElementById('timerIntervals')
const readTimelineButton = document.getElementById('readTimelineButton')

let intervalsCompteur = 0

/* --- LISTENER --- */

addIntervalButton.addEventListener('click', () => {
  // On récupère le nom et la durée de l'interval
  let intervalName = intervalNameInput.value
  let intervalDuration = durationInput.value

  // On créé un objet Interval avec id
  let interval = new Interval(
    'interval' + intervalsCompteur,
    intervalName,
    intervalDuration
  )

  // On ajoute l'interval dans le container d'intervals
  if (interval.duration) {
    intervalsContainer.appendChild(interval.createIntervalHtml())

    // On créé une div droppable vide à la fin
    let dropableDiv = document.createElement('div')
    dropableDiv.classList.add('drop')
    dropableDiv.setAttribute('id', 'empty__interval' + intervalsCompteur)
    dropableDiv.setAttribute('ondrop', 'drop_handler(event)')
    dropableDiv.setAttribute('ondragover', 'dragover_handler(event)')
    intervalsContainer.appendChild(dropableDiv)

    // on oubli pas d'incrémenter le compteur
    intervalsCompteur++
  }
})

readTimelineButton.addEventListener('click', validateTimeline)

/* --- FUNCTIONS --- */

/**
 * Get the names and durations and make a string with it.
 */
function timelineToString() {
  const timelineData = document.getElementById('timelineData')
  let timelineDataString = '['

  // On récupère les éléments contenant les noms et durées des intervalles
  const intervalNameCollection = document.getElementsByClassName('intervalName')
  const intervalDurationCollection = document.getElementsByClassName(
    'intervalDuration'
  )

  // On en fait une liste

  for (let i = 0; i < intervalNameCollection.length; i++) {
    let divName = intervalNameCollection.item(i)
    let divDuration = intervalDurationCollection.item(i)

    console.log(divName)
    console.log(divDuration)

    timelineDataString =
      timelineDataString +
      '"' +
      divName.innerText +
      '", "' +
      divDuration.innerText +
      '" ,'
  }

  timelineDataString = timelineDataString + ']'

  // On l'affiche dans une div en vue de récup par PHP
  timelineData.innerText = timelineDataString
}

/**
 *  Ask for validation before sending the string (intervals's name and duration) to PHP
 */
function validateTimeline() {
  timelineToString()

  // ToDo :
  //    - Faire un élément qui apparait avec bouton pour validation
  //    - Faire en sorte que le bouton qui apparait soit un submit pour POST de la string
}
