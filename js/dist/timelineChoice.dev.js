"use strict";

var setTimelineChoice = function setTimelineChoice() {
  var timelineSelect = document.getElementById('timelineList');
  var timelineName = document.getElementById('timelineName');
  timelineSelect.addEventListener('change', function (event) {
    timelineName.value = '';
    document.location.assign('./indexTimer.php?routeur=setTimeline&timelineName=' + event.target.value);
  });
};

document.addEventListener('DOMContentLoaded', setTimelineChoice);