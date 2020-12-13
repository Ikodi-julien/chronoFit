/**
 * Represente un interval de temps à l'intérieur d'une timeline
 * d'entrainement.
 * Paramètres : name, duration, htmlElement
 *
 * Fonctions : createIntervalHtml()
 */

class Interval {
  constructor(id, name, duration) {
    this.id = id
    this.name = name
    this.duration = duration
    this.htmlElement = null
  }

  createIntervalHtml() {
    // on créé une div qui contiendra l'interval dragable
    let intervalContainer = document.createElement('div')
    intervalContainer.classList.add('drop')
    intervalContainer.setAttribute('id', 'full__' + this.id)

    // on créé la div interval
    let intervalDiv = document.createElement('div')
    intervalDiv.classList.add('interval')
    intervalDiv.setAttribute('id', this.id)
    intervalDiv.setAttribute('draggable', 'true')
    intervalDiv.setAttribute('ondragstart', 'dragstart_handler(event)')

    // on créé la div nom
    let nameDiv = document.createElement('div')
    nameDiv.innerText = this.name
    nameDiv.classList.add('timer__intervals__interval__item')
    nameDiv.classList.add('intervalName')

    // on créé la div durée
    let durationDiv = document.createElement('div')
    durationDiv.setAttribute('id', 'duration__' + this.id)
    durationDiv.innerText = this.duration
    durationDiv.classList.add('timer__intervals__interval__item')
    durationDiv.classList.add('intervalDuration')

    // on met nom et durée dans la div interval
    intervalDiv.appendChild(nameDiv)
    intervalDiv.appendChild(durationDiv)

    // on met la div interval dans la div du début
    intervalContainer.appendChild(intervalDiv)

    // on retourne l'élément
    this.htmlElement = intervalContainer
    return this.htmlElement
  }
}

export { Interval }
