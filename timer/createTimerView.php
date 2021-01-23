<?php
$css = "./style.css";
$title = "Timer ChronoFit";
$js0 = "./js/createTimerCRUD.js";
$js1 = "./js/d&d.js";
$js2 = "./node_modules/drag-drop-touch/DragDropTouch.js";
$js3 = "./js/timelineChoice.js";

/*--------------------------------------------------------------*/
/* Traitement des données envoyées par le formulaire ci-dessous-*/
/*--------------------------------------------------------------*/


ob_start();
?>
<h1>TIMER  <span>Create countdown</span></h1>

<?php if (isset($info)) { echo "<p>" . $info . "</p>" ;} ?>

<div class="timer">
  

  <!-- ------------------------------------------------------------ -->
  <!-- -------------------- FORMULAIRE TIMELINE ------------------- -->
  <!-- ------------------------------------------------------------ -->
    <div class="timer__form__box">
      <select name="timeline-list" id="timelineList">
          <option value="">Choisir une timeline</option>

          <!-- BOUCLE SUR RESULTAT DE REQUÊTE -->
          <?php 
          for ($index=0; $index < count($timelines); $index++) { 
            # code...
          ?> 

          <option value="<?= $timelines[$index];?>"><?= $timelines[$index] ;?></option>

          <?php } ?>

      </select>

      <form  action="./indexTimer.php?routeur=manageTimeline" method="post" class="timer__intervals__form" >
        <input type="text" 
        name="timeline-name" 
        id="timelineName"
        placeholder="Ou saisir un nom pour créer une timeline"

        <?php if (isset($timelineName)) {echo "value=".$timelineName ;} ?>
        >

      <input type="text"
      name="timelineId"
      id="timelineId"
      value="<?php if (isset($timeline)) {echo $timeline->id();} ?>"
      </input>

        <div class="timer__intervals__form__controls__row">
          <button type="submit" >Enregistrer</button>
        </div>
    
      <div class="timer__intervals" id="timerIntervals">
        <div
          id="empty__interval"
          class="drop"
          ondrop="drop_handler(event)"
          ondragover="dragover_handler(event)"
          ondragleave="dragleave_handler(event)"
        ></div>

        <?php if (isset($intervals)) {echo $intervals;}?>

      </div>

      </form>
    </div>

<!-- --------------------------------------------------------------------- -->
<!-- ------------------ FORMULAIRE CREATION INTERVAL --------------------- -->
<!-- --------------------------------------------------------------------- -->

  <div class="timer__creation">
    
    <label for="intervalName">Quoi ?</label>
    <input type="text" name="name" class="timer__creation__intervalName" id="intervalName" value="un truc">
    <label for="duration">Durée (s):</label>
    <input type="number" name="duration" class="timer__creation__duration" id="duration" value="10">

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