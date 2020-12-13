<?php
$css = "./style.css";
$title = "Timer ChronoFit";
$js = "./js/readTimer.js";
$js2 = null;
ob_start();
?>
<h1>TIMER  <span>Read Countdown</span></h1>


<div class="timer__container">
  <div class="timer__container__read">
    <div class="timer__container__timeDisplay"  id="timerDisplay">00:00</div>

    <div class="timer__container__controls">
      <button id="timerStartButton" class="big-button">GO</button>
      <button id="timerStopButton" class="big-button">STOP</button>
    </div>
  </div>
</div>

<?php
$content = ob_get_clean();
require("./common/templateModules.php");

?>