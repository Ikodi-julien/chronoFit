"use strict";

/* --- CONSTANTES --- */
var event = new Event('build');
/**
 * Drag & drop intervals functions
 */

function dragstart_handler(ev) {
  // On ajoute l'identifiant de l'élément cible à l'objet de transfert
  ev.dataTransfer.setData('application/my-app', ev.target.id);
  console.log(ev.target.id); // Ajout d'un effet transparent sur l'élément en cours de drag

  ev.target.classList.add('--isDragged');
  ev.dataTransfer.dropEffect = 'move';
}

function dragend_handler(ev) {
  // On retire l'effet transparent sur l'élément en cours de drag
  ev.target.classList.remove('--isDragged');
  ev.dataTransfer.dropEffect = 'move';
}

function dragover_handler(ev) {
  ev.preventDefault();
  ev.dataTransfer.dropEffect = 'move';
  ev.target.classList.add('--isDraggedOver');
}

function dragleave_handler(ev) {
  ev.preventDefault();
  ev.target.classList.remove('--isDraggedOver');
}

function drop_handler(ev) {
  ev.preventDefault(); // On récup l'identifiant de l'élément qui vient d'être droppé

  var data = ev.dataTransfer.getData('application/my-app');
  console.log(data); // On ajoute la div dans l'élément cible

  ev.target.appendChild(document.getElementById(data)); // On envoi la fonction qui refait une timeline à partir de la liste

  createTimeline();
}
/**
 * Drop on trash functions
 * @param {*} ev
 */


function trashDragoverHandler(ev) {
  ev.preventDefault();
  ev.dataTransfer.dropEffect = 'move';
}

function trashDropHandler(ev) {
  ev.preventDefault(); // On récupère le container

  var container = document.getElementById('timerIntervals'); // On récup l'identifiant de l'élément qui vient d'être droppé

  var data = ev.dataTransfer.getData('application/my-app');
  console.log(data); // On récupère l'élément ayant cet id

  var toTrash = document.getElementById(data); // On retire la classe interval

  toTrash.classList.remove('interval'); // On envoi la fonction qui refait une timeline à partir de la classe interval

  createTimeline(); // On envoi un event pour le recalcul du temps total

  document.dispatchEvent(event);
}
/**
 * Function called when à list of interval éléments is modified with drag&drop.
 * Recreate and displays à Timeline from a list of éléments.
 */


function createTimeline() {
  var container = document.getElementById('timerIntervals');
  var intervalsCollection = document.getElementsByClassName('interval');
  var intervalsList = []; // on stock les intervals draggable

  for (var i = 0; i < intervalsCollection.length; i++) {
    intervalsList[i] = intervalsCollection.item(i);
  } // On supprime toutes les divs


  while (container.firstChild) {
    container.removeChild(container.firstChild);
  } // On recréé la timeline et on créé une string de data.


  for (var _i = 0; _i < intervalsList.length; _i++) {
    console.log(intervalsList[_i]); // On gère la création d'une div droppable vide

    var _emptyDrop = document.createElement('div');

    _emptyDrop.id = 'empty__interval' + _i;

    _emptyDrop.classList.add('drop');

    _emptyDrop.setAttribute('ondrop', 'drop_handler(event)');

    _emptyDrop.setAttribute('ondragover', 'dragover_handler(event)');

    _emptyDrop.setAttribute('ondragleave', 'dragleave_handler(event)');

    container.appendChild(_emptyDrop); // Puis la création d'une div pour recevoir l'interval

    var fullDrop = document.createElement('div');
    fullDrop.id = 'full__interval' + _i;
    fullDrop["class"] = 'drop';
    container.appendChild(fullDrop); // On ajoute l'élément de la liste à fullDrop

    fullDrop.appendChild(intervalsList[_i]);
  } // On gère la création d'une div droppable vide à la fin


  var emptyDrop = document.createElement('div');
  emptyDrop.id = 'empty__interval';
  emptyDrop.className = 'drop';
  emptyDrop.setAttribute('ondrop', 'drop_handler(event)');
  emptyDrop.setAttribute('ondragover', 'dragover_handler(event)');
  emptyDrop.setAttribute('ondragleave', 'dragleave_handler(event)');
  container.appendChild(emptyDrop);
}