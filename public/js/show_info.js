document.addEventListener('DOMContentLoaded', () => {
  try {
    const info = document.getElementById('timerInfo');
    info.classList.add('--show');
    setTimeout(() => {
      info.classList.remove('--show');
    }, 1500);
  } catch (error) {
    console.log('Il n\'y a pas de timerInfo à logguer', error);
  }
});
