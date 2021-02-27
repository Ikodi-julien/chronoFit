<?php
session_start();
require("./my_modules/main/controller.php");
require("./my_modules/login/loginController.php");
require("./my_modules/main/model.php");

spl_autoload_register('loadClass');

/* --- ROUTEUR LOGIN --- */

if (isset($_POST['pseudo']) && isset($_POST['mdp'])) {
  $pseudo = htmlspecialchars($_POST['pseudo']);
  $pass = htmlspecialchars($_POST['mdp']);

  stdLoginControl($pseudo, $pass);

// Cookie login
} else {

  require('./my_modules/login/loginView.php');

}


