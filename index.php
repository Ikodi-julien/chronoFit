<?php

require("control/controller.php");
require("common/model.php");

spl_autoload_register('loadClass');

/* --- ROUTEUR LOGIN --- */

if (isset($_POST['pseudo'])) {

  landing();

} else {

  require('login/loginView.php');

}


