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
    intervalContainer.id = 'full__' + this.id

    // on créé la div interval
    let intervalDiv = document.createElement('div')
    intervalDiv.classList.add('interval')
    intervalDiv.id = this.id
    intervalDiv.draggable = true
    intervalDiv.setAttribute('ondragstart', 'dragstart_handler(event)')

    // on créé l'input "nom"
    let nameInput = document.createElement('input')
    nameInput.type = 'text'
    nameInput.name = 'name-' + this.id
    // nameInput.id = 'name__' + this.id
    nameInput.value = this.name
    nameInput.classList.add('timer__intervals__interval__item')
    nameInput.classList.add('intervalName')

    // on créé l'input durée
    let durationInput = document.createElement('input')
    durationInput.type = 'number'
    durationInput.name = 'duration-' + this.id
    durationInput.id = 'duration__' + this.id
    durationInput.value = this.duration
    durationInput.classList.add('timer__intervals__interval__item')
    durationInput.classList.add('intervalDuration')

    // on met nom et durée dans la div interval
    intervalDiv.appendChild(nameInput)
    intervalDiv.appendChild(durationInput)

    // on met la div interval dans la div du début
    intervalContainer.appendChild(intervalDiv)

    // on retourne l'élément
    this.htmlElement = intervalContainer
    return this.htmlElement
  }
}

export { Interval }
