<?php
/* --- LOGIN --- */

function login() {

  header('Location: index.php');

}

/* --- LANDING --- */

function landing() {

  header('Location: indexLanding.php');

}

function timer() {

  header('Location: indexTimer.php');

}

function training() {

  header('Location: 404_redirect.html');

}

function exercice() {
  header('Location: indexExercices.php');

}

function profil() {

  header('Location: 404_redirect.html');

}

function landingView() {

  require("landing/landingView.php");

}

/* --- EXERCICE --- */

function controlAddExo($exoName, $exoDescription, $exoMainCat, $exoBodyPart) {

  if (empty($exoName) | empty($exoDescription) | empty($exoMainCat) | empty($exoBodyPart)) {
    return false;
  } else {
    return true;
  }
}


function controlUpdateExo($exoId, $exoName, $exoDescription, $exoMainCat, $exoBodyPart) {

  if (empty($exoId) | empty($exoName) | empty($exoDescription) | empty($exoMainCat) | empty($exoBodyPart)) {
    return false;
  } else {
    return true;
  }
}

/* --- TIMER --- */

function readTimeline() {

  if (isset($_POST['timelineData'])) {
    $timelineData = $_POST['timelineData'];

    
  } else {
    return;
  }
  require("timer/readTimerView.php");
}

function checkTimeline(array $array) {
  foreach ($array as $key => $value) {
    // On enlève les éventuels caractères dangereux
    $array[$key] = htmlspecialchars($value);
  }
  return $array;
}