<?php

require('./my_modules/main/mainController.php');
require('./my_modules/main/model.php');
spl_autoload_register('loadClass');

function getExoList() {
  
  $exosManager = new ExercicesManager();
  
return $exosManager->getList();
  
}

function getMainCat($exo) {
  
  $exosManager = new ExercicesManager();
  
return $exosManager->getMainCat($exo);
  
}

function getBodyPart($exo) {
  
  $exosManager = new ExercicesManager();
  
return $exosManager->getBodyPart($exo);
  
}

function getExo($id) {
  
  $exosManager = new ExercicesManager();

  return $exosManager->get($id);
}