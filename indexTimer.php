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
      $timelineData = checkChars($_POST);

      // On créé un objet Timeline
      $timeline = new Timeline($timelineData);

      // Cas update ou création d'une timeline, 
      // On ne change pas la timeline vide
      if ($timeline->name() != "Vide") {
        // on check si le nom est déjà dans la base, 
        if ($timelineManager->isExistTimelineName($timeline->name())) {

          /*----------- UPDATE --------------*/

          if ($affectedLines = $timelineManager->update($timeline)) {
            // On indique que l'update a fonctionné
            $info = 'Update OK ';
          } else {
            // On indique que l'update n'a pas fonctionné
            $info = 'Update NOK ';
          };

        } else {

          /*----------------- CREATE ----------------*/

          $info = 'On ajoute la timeline !';
          if ($affectedLines = $timelineManager->add($timeline)) {
            // On indique que l'ajout a fonctionné
            $info = 'Timeline ajoutée';
          } else {
            // On indique que l'ajout n'a pas fonctionné
            $info = 'Oups... ç\'a n\'a pas fonctionné.... ';
          };

        }
        // finalement on redirige sur une route get pour réinitialiser le POST,
        header('Location: ./indexTimer.php?routeur=setTimeline&timelineName=' . $timeline->name() . '&info=' . $info);
      
      } else {
        $info = "Il faut choisir un nom pour pouvoir enregistrer";

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
    if (isset($_GET['timelineName'])) {
      // On gère la demande à la base de données
      $name = $_GET['timelineName'];
      if ($timeline = $timelineManager->get($name)) {
      $info = 'Récup OK';

      } else {
      $info = 'Récup NOK' . $name;

      };
    // On affiche l'éventuelle info récup
    if (isset($_GET['info'])) { $info = htmlspecialchars($_GET['info']);}

    } else {
      header('Location: ./404_redirect.php',);
    }

  } else {
    header('Location: ./404_redirect.php',);
  }

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

// On récupe aussi les timelines pour affichage des noms dans le select
$timelines = $timelineManager->getTimelineNames();

// On affiche le tout
require('./timer/createTimerView.php');