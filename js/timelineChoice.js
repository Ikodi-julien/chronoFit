const setTimelineChoice = () => {
  const timelineSelect = document.getElementById('timelineList');
  const timelineName = document.getElementById('timelineName');
  timelineSelect.addEventListener('change', (event) => {
    timelineName.value = '';
    document.location.assign(
      './indexTimer.php?routeur=setTimeline&timelineName=' + event.target.value
    );
  });
};

document.addEventListener('DOMContentLoaded', setTimelineChoice);
