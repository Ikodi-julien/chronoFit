<?php

require("control/controller.php");
require("common/model.php");
require("../chronoFit/classes/Timeline.php");

spl_autoload_register('loadClass');
// On créé un manager de timelinee
$timelineManager = new TimelineManager();

/* --- ROUTEUR TIMER --- */

if (isset($_GET['routeur'])) {

  $routeur = htmlspecialchars($_GET['routeur']);

  if ($routeur == 'disconnect') {

    landing();

    // --------------------------------------------------------
    // -------------- TIMELINE MANAGING -----------------------
    // --------------------------------------------------------

  } elseif (isset($_POST["timeline-name"]) &&
          $_POST["timeline-name"] != "" && 
          $_POST["timeline-name"] != "vide") {

    if ($routeur == 'manageTimeline') { // DB => UPDATE ou CREATE

      // On htmlspecialchars les données dans POST
      $timelineData = checkTimeline($_POST);

      // On créé un objet Timeline
      $timeline = new Timeline($timelineData);

      // Cas update ou création d'une timeline, 
      // On ne change pas la timeline vide
      if ($timeline->name() != "Vide") {
        // on check si le nom est déjà dans la base, 
        if ($timelineManager->isExistTimelineName($timeline->name())) {
          // UPDATE :
          if ($affectedLines = $timelineManager->update($timeline)) {
            // On indique que l'update n'a pas fonctionné
            $info = 'Update OK ';
          } else {
            // On indique que l'update a fonctionné
            $info = 'Update NOK ';
          };

        } else {
          // CREATE :
          $info = 'On ajoute la timeline !';
          $timelineManager->add($timeline);

        }
        // finalement on redirige sur une route get pour réinitialiser le POST,
        header('Location: ./indexTimer.php?routeur=setTimeline&timelineName=' . $timeline->name());
      
      } else {
        $info = "Il faut choisir un nom pour enregistrer la timeline";

      }
    } elseif ($routeur == 'getTimeline') { // DB => READ
      $name = $_POST["timeline-name"];
      // Le manager fait le job
      $timeline = $timelineManager->get($name);

    } else {

    header('Location: ./404_redirect.php',);
    }

  } elseif ($routeur == 'deleteTimeline') { // DB => DELETE
    if (isset($_GET['timelineId'])) {
      $timelineId = htmlspecialchars($_GET['timelineId']);
      // On fait le delete
      $timelineManager->delete($timelineId);
    }

  } elseif ($routeur == 'setTimeline') { // La demande vient du "select" ou redirect
    // On gère la demande à la base de données
    $name = htmlspecialchars($_GET['timelineName']);
    $timeline = $timelineManager->get($name);

  } else {
    $info = 'La route n\'est pas définie';
  }

  // On récupe aussi les timelines pour affichage des noms dans le select
  $timelines = $timelineManager->getTimelineNames();
  // print_r($timelines);
  // Finalement on recréé la liste d'intervals

  if (isset($timeline)) {

    // On met un nom dans le champ nom de la timeline
    $timelineName = $timeline->name();

    // On crée les intervals
    ob_start();
    $timeline->recreateIntervalsList();
    $intervals = ob_get_clean();
  }
} 

// On affiche le tout
require('./timer/createTimerView.php');