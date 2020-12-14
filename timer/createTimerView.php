<?php
$css = "./style.css";
$title = "Timer ChronoFit";
$js = "./js/createTimer.js";
$js2 = "./js/d&d.js";

ob_start();
?>
<h1>TIMER  <span>Create countdown</span></h1>

<div class="timer__container">
  
  <div class="timer__container__intervals">
    <div class="timer__container__intervals__list" id="timerIntervals">
      <div
          id="empty__interval"
          class="drop"
          ondrop="drop_handler(event)"
          ondragover="dragover_handler(event)"
        ></div>
    </div>
    <div 
      class="timer__trash drop --trash"
      ondrop="trashDropHandler(event)"
      ondragover="trashDragoverHandler(event)"
      >Poubelle
    </div>
  </div>

  <div class="timer__container__creation">
    
    <label for="intervalName">Quoi ?</label>
    <input type="text" name="name" class="timer__container__creation__intervalName" id="intervalName">
    <label for="duration">Durée (s):</label>
    <input type="number" name="duration" class="timer__container__creation__duration" id="duration">

    <button id="addInterval" class="--big-button">Ajouter l'interval</button>
    <button id="goToReadTimelineButton" class="--big-button">Lancer la Timeline</button>
  </div>
</div>

<!-- ### A VOIR POUR CRUD TIMELINE ###

<form action="indexTimer.php?routeur=readTimeline" method="post">
  <textarea name="timelineData" id="timelineData" cols="10" rows="3"></textarea>
  <button id="submitTimelineData" type="submit" class="--big-button">Valider Enregistrement</button>
</form>

-->

<div class="timer__container">
  <div class="timer__container__read">
    <div class="timer__container__read__close">X</div>
    <div class="timer__container__timeDisplay"  id="timerDisplay">00:00</div>

    <div class="timer__container__controls">
      <button id="timerStartButton" class="--big-button">START</button>
      <button id="timerPauseButton" class="--big-button">PAUSE</button>
    </div>
  </div>
</div>

<embed 
src="./sounds/first_bips.wav" 
autostart="false" 
width="0" height="0" id="firstBip"
enablejavascript="true">

<embed 
src="./sounds/final_bip.wav" 
autostart="false" 
width="0" height="0" id="finalBip"
enablejavascript="true">

<?php
$content = ob_get_clean();
require("./common/templateModules.php");

?>