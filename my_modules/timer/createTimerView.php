<?php
$css = "style.css";
$title = "Timer ChronoFit";
$jsTimer = "createTimerCRUD.js";
$js1 = "d&d.js";
$js2 = "../../node_modules/drag-drop-touch/DragDropTouch.js";
$js3 = "timelineChoices.js";
$js4 = "show_info.js";

/*--------------------------------------------------------------*/
/* Traitement des données envoyées par le formulaire ci-dessous-*/
/*--------------------------------------------------------------*/


ob_start();
?>

<h1>TIMER  <span>Récupérer ou créer une Timeline</span></h1>

    <div class="timer__select__row">
      <select name="timeline-list" id="timelineList" class="timer__select__select">
          <option value="">Choisir une timeline</option>
  
          <!-- BOUCLE SUR RESULTAT DE REQUÊTE -->
          <?php
          for ($index=0; $index < count($timerData['timelines']); $index++) {
            # code...
          ?>
  
          <option value="<?= $timerData['timelines'][$index];?>"><?= $timerData['timelines'][$index] ;?></option>
  
          <?php } ?>
  
      </select>
  
<?php if (isset($_SESSION['login']) && $_SESSION['login']) { ?>
            <div class="timer__intervals__falseSubmit">
              <button type="button" class="button__timeline" id="timelineFalseSubmit">Enregistrer</button>
            </div>
      <?php } ?>
      
    </div>
    
    
<div class="timer">


  <!-- ------------------------------------------------------------ -->
  <!-- -------------------- TIMELINE ------------------------------ -->
  <!-- ------------------------------------------------------------ -->

  
  <div class="timer__form__box">

      <form  action="./indexTimer.php?routeur=manageTimeline" method="post" class="timer__intervals__form" >
        <div class="timer__intervals__form__controls__row">
          <input type="text"
          name="timeline-name"
          class="timer__intervals__form__nameInput"
          id="timelineName"
          placeholder="Ou saisir un nom pour créer une timeline"
          value="<?php if ($timerData['timeline'] !== null) {
            $timerData['timeline']->name();
          } ?>"
          />
  

        </div>

        <input type="text"
        name="timelineId"
        id="timelineId"
          value="<?php if ($timerData['timeline'] !== null) {
            $timerData['timeline']->id();
          } ?>"
        />

        <div class="timer__intervals__submitBox" id="submitBox">
          <p>Etes-vous sûr de vouloir enregistrer cette Timeline ?</p>
          <button type="submit" class="button__timeline">OUI</button>
          <button type="button" class="button__timeline" id="hideSubmitBoxButton">NON</button>
        </div>

        <div class="timer__intervals" id="timerIntervals">
          <div
            id="empty__interval"
            class="drop"
            ondrop="drop_handler(event)"
            ondragover="dragover_handler(event)"
            ondragleave="dragleave_handler(event)"
          ></div>

        <?php if ($timerData['timeline'] !== null) {
          
          $timerData['timeline']->recreateIntervalsList();
        }?>

      </div>

      </form>
    </div>

<!-- --------------------------------------------------------------------- -->
<!-- ------------------ FORMULAIRE CREATION INTERVAL --------------------- -->
<!-- --------------------------------------------------------------------- -->

  <div class="timer__creation">

    <label for="intervalName">Quoi ?</label>
    <input type="text" name="name" class="timer__creation__intervalName" id="intervalName" placeholder="nom exo">
    
    <div class="timer__creation__duration__row">
      
      <label for="duration">Durée (s):</label>
      <input type="number" name="duration" class="timer__creation__duration" id="duration" >
    </div>

    <button id="addInterval" class="button__intervalCreation"><i data-feather="arrow-left"></i><i data-feather="plus-square"></i></button>
    <button id="goToReadTimelineButton" class="button__intervalCreation"><i data-feather="thumbs-up"></i></button>

    <div class="timer__creation__total">Total = <span id="totalTimePreview">00:00</span></div>


    <div
      class="timer__trash drop"
      ondrop="trashDropHandler(event)"
      ondragover="trashDragoverHandler(event)"
      ><i data-feather="arrow-right"></i><i data-feather="trash-2"></i>
    </div>
  </div>
</div>


<!-- --------------------------------------------------------------------- -->
<!-- ------------------ TIMER READ - VIEW -------------------------------- -->
<!-- --------------------------------------------------------------------- -->


<div class="timer timer__read__hidden" id="timerRead">
<!-- Insertion d'une vidéo en background -->
  <video loop class="timer__read__hidden" id="bg-video">
    <source src="./public/videos/video.mp4" type="video/mp4">

  </video>

  <div class="timer__read">
    <div class="timer__read__close" id="timerReadClose"><i data-feather="x"></i></div>
    <div class="timer__read__exoName"id="exoNameDisplay"></div>
    <div class="timer__timeDisplay"  id="timerDisplay">00:00</div>

    <div class="timer__controls">
      
      <div class="timer__controls__row">
        <button id="timerStartButton" class="button__timerReadControls"><i data-feather="play"></i></button>
        <button id="timerPauseButton" class="button__timerReadControls"><i data-feather="pause"></i></button>
      </div>
      
      <div class="timer__controls__row">
        <button id="previousCountdown" class="button__timerReadControls"><i data-feather="skip-back"></i></button>
        <button id="nextCountdown" class="button__timerReadControls"><i data-feather="skip-forward"></i></button>
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
require("./my_modules/views/template.php");

?>