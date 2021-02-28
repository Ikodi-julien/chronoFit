<?php
session_start();
require("./my_modules/timer/timerController.php");


/* --- ROUTEUR TIMER --- */
$message = "";
$timeline = null;

if (isset($_GET['routeur'])) {

  $routeur = htmlspecialchars($_GET['routeur']);

    // --------------------------------------------------------
    // -------------- TIMELINE MANAGING -----------------------
    // --------------------------------------------------------

  if ($routeur == 'setTimeline') { // La demande vient du "select" ou redirect
    if (isset($_GET['timelineName'])) {
      
      $timeline = getTimelineByName($_GET);
      
    } else {
      header('Location: ./404_redirect.php',);
    }
  
  } elseif ($routeur == 'deleteTimeline') { // DB => DELETE
    if (isset($_GET['timelineId'])) {
      
      if ($isDeleted = deleteTimeline($_GET)) {
        
        $_SESSION['message'] = 'Timeline supprimée';
      } else {
        
        $_SESSION['message'] = 'Problème, timeline pas supprimée';
      };
    }
      /*------------- POST ---------------------*/

  } elseif (
    isset($_POST["timeline-name"]) &&
    $_POST["timeline-name"] != "" &&
    $_POST["timeline-name"] != "vide"
    ) {

    if ($routeur == 'manageTimeline') { // DB => UPDATE ou CREATE
      
      if ($timelineName = manageTimeline($_POST)) {
        
        // finalement on redirige sur une route get pour réinitialiser le POST,
        header('Location: ./indexTimer.php?routeur=setTimeline&timelineName='
        . $timelineName
        );
        
      } else {
        header('Location: ./indexTimer.php');
      }
    } else {
    header('Location: ./404_redirect.php',);
    }
  } else {
    header('Location: ./404_redirect.php',);
  }
}

/* All data are in timerData : */
$timerData = array(
  'timeline' => $timeline,
  'timelines' => getTimelineNames()
);

require('./my_modules/timer/createTimerView.php');