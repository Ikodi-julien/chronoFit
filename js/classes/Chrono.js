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
 *    - return void
 * - stop : Arrête countAhead et countDown,
 *    - return this.startTime
 * - timeDislay : méthode interne
 *    - return string
 * - playFirstBip : envoi les premiers Bips
 * - playFinalBip : envoi le Bip final
 */
class Chrono {
  constructor(startTime, display) {
    this.startTime = startTime;
    this.display = display;
    this.interval = 0;
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
    console.log("départ compte à rebours");
    let timeString = this.timeDisplay();
    // this.display.innerText = timeString;

    const aRepeter = () => {
      if (this.startTime <= 0) {
        clearInterval(this.interval);
      } else {
        this.startTime--;
        timeString = this.timeDisplay();
        this.display.innerText = timeString;

        if (this.startTime > 0 && this.startTime < 3) {
          this.playFirstBip();
        }
        if (this.startTime == 0) this.playFinalBip();
      }
    };
    aRepeter();
    this.interval = setInterval(aRepeter, 1000);
  }

  stop() {
    console.log("Arrêt du chrono");
    clearInterval(this.interval);
    this.interval = 0;
    let timeString = this.timeDisplay();
    this.display.innerText = timeString;
    return this.startTime;
  }

  timeDisplay() {
    let unitMin = Math.floor((this.startTime / 60) % 10);
    let tenMin = Math.floor(this.startTime / 600);

    let unitSec = Math.floor((this.startTime % 60) % 10);
    let tenSec = Math.floor((this.startTime % 60) / 10);

    let string = tenMin + "" + unitMin + ":" + tenSec + "" + unitSec;
    return string;
  }

  playFirstBip() {
    console.log("on fait Bip !");

    let firstBip = new Audio("./sounds/first_bips.wav");
    firstBip.play();
  }

  playFinalBip() {
    console.log("on fait le bip final !");

    let finalBip = new Audio("./sounds/final_bip.wav");
    finalBip.play();
  }
}

export { Chrono };
