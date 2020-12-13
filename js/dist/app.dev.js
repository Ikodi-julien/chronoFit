"use strict";

var _Chrono = require("./Chrono.js");

var countAheadButton = document.querySelector('#countAheadButton');
var countDownButton = document.querySelector('#countDownButton');
var stopChronoButton = document.querySelector('#stopChronoButton');
var display = document.getElementById('display');
var chrono = new _Chrono.Chrono(10, display);
countAheadButton.addEventListener('click', function () {
  chrono.countAhead();
});
countDownButton.addEventListener('click', function () {
  chrono.countDown();
});
stopChronoButton.addEventListener('click', function () {
  chrono.stop();
});