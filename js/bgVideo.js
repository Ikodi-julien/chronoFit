const videoManager = {
  bgVideo: document.getElementById('bg-video'),

  /**
   * Places an event listener on a DOM element, in order to start the video
   * @param {Object} button DOM élément that starts the video
   */
  readyVideo: (button) => {
    console.log('appel de readyVideo');
    button.addEventListener('click', videoManager.playLoop, false);
  },

  /**
   * Places an event listener on a DOM element in order to stop the video.
   * @param { Object } button DOM élément that starts the video
   */
  stopVideo: (button) => {
    console.log('appel de stopTimervideo');
    button.addEventListener('click', videoManager.stopLoop, false);
  },

  playLoop: () => {
    console.log('appel de playLoop');
    videoManager.bgVideo.play();
  },

  stopLoop: () => {
    console.log('On stop les tictacs');
    videoManager.bgVideo.pause();
  }
}


export { videoManager };
