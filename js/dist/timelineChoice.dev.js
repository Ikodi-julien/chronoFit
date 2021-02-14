"use strict";

var hideSubmitBoxButton = document.getElementById('hideSubmitBoxButton');
var timelineSelect = document.getElementById('timelineList');
var timelineName = document.getElementById('timelineName');
var falseSubmitButton = document.getElementById('timelineFalseSubmit');
var submitBox = document.getElementById('submitBox');

var setTimelineChoice = function setTimelineChoice() {
  timelineSelect.addEventListener('change', function (event) {
    timelineName.value = '';
    document.location.assign('./indexTimer.php?routeur=setTimeline&timelineName=' + event.target.value);
  });
};

var showSubmitBox = function showSubmitBox() {
  falseSubmitButton.addEventListener('click', function () {
    submitBox.classList.add('--show');
  });
};

var hideSubmitBox = function hideSubmitBox() {
  hideSubmitBoxButton.addEventListener('click', function () {
    submitBox.classList.remove('--show');
  });
};

document.addEventListener('DOMContentLoaded', function () {
  setTimelineChoice();
  showSubmitBox();
  hideSubmitBox();
});