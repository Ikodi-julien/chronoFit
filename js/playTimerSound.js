const TSM = {
  tictac: document.getElementById('tictac'),

  /**
   * Places an event listener on a DOM element, in order to start the sound
   * @param {Object} button DOM élément that starts the sound
   */
  readyTimerSound: (button) => {
    console.log('appel de readyTimerSound');
    button.addEventListener('click', TSM.playLoop, false);
  },

  /**
   * Places an event listener on a DOM element in order to stop the sound.
   * @param { Object } button DOM élément that starts the sound
   */
  stopTimerSound: (button) => {
    console.log('appel de stopTimerSound');
    button.addEventListener('click', TSM.stopLoop, false);
  },

  playLoop: () => {
    console.log('appel de playLoop');
    TSM.tictac.play();
  },

  stopLoop: () => {
    console.log('On stop les tictacs');
    TSM.tictac.pause();
  }
}


export { TSM };
