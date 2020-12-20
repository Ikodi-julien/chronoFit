<?php
$css = "./style.css";
$title = "Timer ChronoFit";
$js = "./js/createTimer.js";
$js2 = "./js/d&d.js";
$js3 = "./node_modules/drag-drop-touch/DragDropTouch.js";

ob_start();
?>
<h1>TIMER  <span>Create countdown</span></h1>

<div class="timer">
  
  <div class="timer__intervals">
    <div class="timer__intervals__list" id="timerIntervals">
      <div
          id="empty__interval"
          class="drop"
          ondrop="drop_handler(event)"
          ondragover="dragover_handler(event)"
          ondragleave="dragleave_handler(event)"
        ></div>
    </div>

  </div>

  <div class="timer__creation">
    
    <label for="intervalName">Quoi ?</label>
    <input type="text" name="name" class="timer__creation__intervalName" id="intervalName" >
    <label for="duration">Durée (s):</label>
    <input type="number" name="duration" class="timer__creation__duration" id="duration">

    <button id="addInterval" class="--big-button">Ajouter l'interval</button>
    <button id="goToReadTimelineButton" class="--big-button">Valider la Timeline</button>

    <div class="timer__creation__total">Total = <span id="totalTimePreview">00:00</span></div>


    <div 
      class="timer__trash drop --trash"
      ondrop="trashDropHandler(event)"
      ondragover="trashDragoverHandler(event)"
      >Poubelle
    </div>
  </div>
</div>

<!-- ### A VOIR POUR CRUD TIMELINE ###

<form action="indexTimer.php?routeur=readTimeline" method="post">
  <textarea name="timelineData" id="timelineData" cols="10" rows="3"></textarea>
  <button id="submitTimelineData" type="submit" class="--big-button">Valider Enregistrement</button>
</form>

-->

<div class="timer timer__read__hidden" id="timerRead">
  <div class="timer__read">
    <div class="timer__read__close" id="timerReadClose">X</div>
    <div class="timer__read__exoName"id="exoNameDisplay"></div>
    <div class="timer__timeDisplay"  id="timerDisplay">00:00</div>

    <div class="timer__controls">
      <div class="timer__controls__row">
        <button id="timerStartButton" class="--big-button">START</button>
        <button id="timerPauseButton" class="--big-button">||</button>
      </div>
      <div class="timer__controls__row">
        <button id="previousCountdown" class="--big-button"><<</button>
        <button id="nextCountdown" class="--big-button">>></button>
      </div>
    </div>
    <div class="timer__read__row">
      <div class="timer__read__totalTime">Total restant <span id="totalTimeDisplay"></span></div>
      <div class="timer__read__nextExoName">Exo suivant : <span id="nextExoNameDisplay"></span></div>
    </div>

  </div>
</div>

<?php
$content = ob_get_clean();
require("./common/templateModules.php");

?>