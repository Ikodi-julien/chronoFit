<?php
session_start();
require("./my_modules/login/loginController.php");
require('./my_modules/main/mainController.php');
require("./my_modules/main/model.php");
spl_autoload_register('loadClass');

/* --- ROUTEUR LOGIN --- */
if (isset($_GET['routeur'])) {
  
  $route = htmlspecialchars($_GET['routeur']);
  
  if ($route === 'login') {
    
    login();
    
  }
  if ($route === 'createProfilView') {
    
    createProfilView();
    
  } else if ($route === 'createProfil' && isset($_POST['email'])) {
    
    if (createProfil($_POST)) {
      
      header('Location: indexExercice.php');
    } else {
      
      header('Location: indexLogin.php?routeur=createProfilView');
    }
  }
} else if (
  
  isset($_POST['email']) &&
  isset($_POST['password']) &&
  $_POST['email'] !== "" &&
  $_POST['password'] !== ""
  ) {
    

  if (stdLoginControl($_POST)) {
    header('Location: index.php');
    
  } else {
    header('Location: indexLogin.php');
  };

} else {
  
  require('./my_modules/login/loginView.php');
  
}




