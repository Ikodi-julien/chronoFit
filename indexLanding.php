<?php

require("control/controller.php");
require("common/model.php");

spl_autoload_register('loadClass');

/* --- ROUTEUR LANDING--- */

if (isset($_GET['routeur'])) {

  $routeur = htmlspecialchars($_GET['routeur']);

  if ($routeur == 'disconnect') {

    login();

  } elseif ($routeur == "timer") {

    timer();

  } elseif ($routeur == "getTrainings") {

    training();

  } elseif ($routeur == "getExercices") {

    exercice();

  } elseif ($routeur == "profil") {

    profil();
  
  }

} else {

  landingView();

}