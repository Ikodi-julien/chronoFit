"use strict";

var _Chrono = require("./classes/Chrono.js");

var _Interval = require("./classes/Interval.js");

var startCountDownButton = document.querySelector('#timerStartButton');
var stopChronoButton = document.querySelector('#timerStopButton');
var addIntervalButton = document.querySelector('#addInterval');
var intervalNameInput = document.getElementById('intervalName');
var durationInput = document.getElementById('duration');
var intervalsContainer = document.getElementById('timerIntervals');
var display = document.getElementById('timerDisplay');
var durationList = [];
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
startCountDownButton.addEventListener('click', function () {
  // On récup les intervals à lire
  var intervalsCollection = document.getElementsByClassName('interval');
  console.log(intervalsCollection); // On récupère la durée des intervals à lire

  for (var i = 0; i < intervalsCollection.length; i++) {
    var duration = intervalsCollection.item(i).childNodes.item(1).innerText;
    durationList.push(duration);
  }

  console.log('durée du 1er : ' + durationList[0]); // On envoi la fonction asynchrone de CAR

  awaitCountDown(durationList);
});

var promiseCountDown = function promiseCountDown(durationList) {
  return new Promise(function (resolve) {
    // Création d'un chrono chargé de cet interval
    var duration = durationList.shift();
    var chrono = new _Chrono.Chrono(duration, display); // Création listener pour arrêt du chrono

    stopChronoButton.addEventListener('click', function () {
      var stopTime = chrono.stop();
      console.log('temps récup : ' + stopTime);
      durationList.unshift(stopTime);
      clearTimeout(timerPromise);
      resolve(false);
    }); // Démarrage du CAR

    chrono.countDown();
    var timerPromise = setTimeout(function () {
      resolve(true);
      console.log('La promesse countDown est terminée ' + chrono.startTime);
    }, chrono.startTime * 1000 + 1000);
  });
};

var awaitCountDown = function awaitCountDown(durationList) {
  var result;
  return regeneratorRuntime.async(function awaitCountDown$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!durationList.length) {
            _context.next = 9;
            break;
          }

          console.log('Taille liste durées : ' + durationList.length);
          _context.next = 4;
          return regeneratorRuntime.awrap(promiseCountDown(durationList));

        case 4:
          result = _context.sent;
          console.log('prochain : ' + durationList[0]);

          if (!result) {
            durationList = [];
            console.log('Taille liste !result : ' + durationList.length);
          }

          _context.next = 0;
          break;

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
};