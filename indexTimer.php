<?php

require("control/controller.php");
require("common/model.php");

spl_autoload_register('loadClass');

/* --- ROUTEUR TIMER --- */

if (isset($_GET['routeur'])) {

  $routeur = htmlspecialchars($_GET['routeur']);

  if ($routeur == 'disconnect') {

    landing();
  } elseif ($routeur == 'readTimeline') {

    readTimer();
  }

} else {

  require('./timer/createTimerView.php');
}
