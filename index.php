<?php
session_start();
require("./my_modules/main/mainController.php");

/* --- ROUTEUR LANDING--- */

if (isset($_GET['routeur'])) {

  $routeur = htmlspecialchars($_GET['routeur']);

  if ($routeur == 'disconnect') {

    $_SESSION = null;
    $_SESSION['message'] = 'Les infos de connexion ont été effacées';
    landingView();

  } elseif ($routeur == "timer") {

    timer();

  } elseif ($routeur == "getTrainings") {

    training();

  } elseif ($routeur == "getExercices") {

    exercice();

  } elseif ($routeur == "profil") {

    profil();
  
  } elseif ($routeur = 'login') {
    
    login();
  }

} else {

  landingView();

}