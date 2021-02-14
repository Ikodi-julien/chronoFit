document.addEventListener('DOMContentLoaded', () => {
  const hideSubmitBoxButton = document.getElementById('hideSubmitBoxButton');
  const timelineName = document.getElementById('timelineName');
  const falseSubmitButton = document.getElementById('timelineFalseSubmit');
  const submitBox = document.getElementById('submitBox');
  const timelineSelect = document.getElementById('timelineList');

  const setTimelineChoice = () => {
    timelineSelect.addEventListener('change', (event) => {
      timelineName.value = '';
      document.location.assign(
        './indexTimer.php?routeur=setTimeline&timelineName=' +
          event.target.value
      );
    });
  };

  const showSubmitBox = () => {
    falseSubmitButton.addEventListener('click', () => {
      submitBox.classList.add('--show');
    });
  };

  const hideSubmitBox = () => {
    hideSubmitBoxButton.addEventListener('click', () => {
      submitBox.classList.remove('--show');
    });
  };

  setTimelineChoice();
  showSubmitBox();
  hideSubmitBox();
});
