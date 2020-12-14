/**
 * Object Chrono,
 * ATTRIBUTS D'INSTANCE :
 *  - startTime = integer, le temps de départ (0 par défaut)
 *  - display = HTMLElement dans lequel afficher,
 *  - interval = représente setInterval en cours.
 *
 * FONCTIONS :
 * - countAhead : Compte de 0 jusqu'à l'info de stopper, +1 à chaque seconde
 * - countDown : Compte à rebours depuis un temps donner jusqu'à 0,
 *    - return "true" à 0
 * - stop : Arrête countAhead et countDown,
 *    - return "true"
 */
class Chrono {
  constructor(startTime, display) {
    this.startTime = startTime;
    this.display = display;
    this.interval = null;
    this.nextCountDown = false;
    console.log("nouvel objet Chrono créé");
  }

  countAhead() {
    console.log("départ chrono sur = " + this.display);

    const aRepeter = () => {
      // On affiche le temps
      this.display.innerText = this.startTime;
      this.startTime += 1;
    };
    this.interval = setInterval(aRepeter, 1000);
  }

  countDown() {
    console.log("départ compte à rebours sur = " + this.display);
    this.display.innerText = this.startTime;

    const aRepeter = () => {
      if (this.startTime <= 0) {
        clearInterval(this.interval);
      } else {
        if (this.startTime > 0 && this.startime < 5) {
          this.playFirstBip();
        }
        this.startTime -= 1;
        this.display.innerText = this.startTime;
      }
    };
    this.interval = setInterval(aRepeter, 1000);
  }

  stop() {
    console.log("Arrêt du chrono");
    clearInterval(this.interval);
    this.display.innerText = this.startTime;
    return this.startTime;
  }

  playFirstBip() {
    let firstBip = document.getElementById("firstBip");
    firstBip.play();
    console.log("on fait Bip !");
  }
}

export { Chrono };
