<?php

require("control/controller.php");
require("common/model.php");

spl_autoload_register('loadClass');

$exoManager = new ExercicesManager();
$listExo = $exoManager->getList();

/* --- ROUTEUR EXERCICE --- */

if (isset($_GET['routeur'])) {

  $routeur = htmlspecialchars($_GET['routeur']);

  if ($routeur == 'disconnect') {

    login();

  } elseif ($routeur == "landing") {

    landing();
  
  } elseif ($routeur == "updateExoView") {

    require("exercice/views/updateExoView.php");

  } elseif ($routeur == "updateExo") {

    if (isset($_GET['exoId']) && isset($_POST['exoName']) && isset($_POST['exoDescription']) && isset($_POST['exoMainCat']) && isset($_POST['exoBodyPart'])) {

      try {
        $exoId = htmlspecialchars($_GET['exoId']);
        $exoName = htmlspecialchars($_POST['exoName']);
        $exoDescription = htmlspecialchars($_POST['exoDescription']);
        $exoMainCat = htmlspecialchars($_POST['exoMainCat']);
        $exoBodyPart = htmlspecialchars($_POST['exoBodyPart']);

        $isOkExo = controlUpdateExo($exoId, $exoName, $exoDescription, $exoMainCat, $exoBodyPart);

        if ($isOkExo) {

          $exoToUpdate = new Exercice(array(
            'id' => $exoId,
            'name' => $exoName,
            'description' => $exoDescription,
            'mainCat' => $exoMainCat,
            'bodyPart' => $exoBodyPart
          ));
        
          $affectedLines = $exoManager->update($exoToUpdate);
      
          if ($affectedLines) {
            echo 'ok, c\'est modifié';
            $_POST = [];
            $listExo = $exoManager->getList();

            require("exercice/views/listExoView.php");
        
          } else {
            echo 'et bé non, c pas ajouté...';
            require("exercice/views/listExoView.php");

          }
        } else {
          echo 'Problème isNotOkExo';
        }
      } catch(Exception $e) {
        echo "** ERREUR ** : ". $e->getMessage();
      }
    } else {
      echo 'Problème au niveau de la vérif des paramètres dans exerciceIndex.php';
    }
  
  } elseif ($routeur == "insertExoView") {

    require("exercice/views/insertExoView.php");

  } elseif ($routeur == "insertExo") {

    if (isset($_POST['exoName']) && isset($_POST['exoDescription']) && isset($_POST['exoMainCat']) && isset($_POST['exoBodyPart'])) {

      try {
        $exoName = htmlspecialchars($_POST['exoName']);
        $exoDescription = htmlspecialchars($_POST['exoDescription']);
        $exoMainCat = htmlspecialchars($_POST['exoMainCat']);
        $exoBodyPart = htmlspecialchars($_POST['exoBodyPart']);

        $isOkExo = controlAddExo($exoName, $exoDescription, $exoMainCat, $exoBodyPart);

        if ($isOkExo) {

          $affectedLines = $exoManager->add(new Exercice(array(
            'name' => $exoName,
            'description' => $exoDescription,
            'mainCat' => $exoMainCat,
            'bodyPart' => $exoBodyPart
          )));

          if ($affectedLines) {
            echo 'ok, c\'est ajouté';
            $_POST = [];
            $listExo = $exoManager->getList();

            require("exercice/views/listExoView.php");
        
          } else {
            echo 'et bé non, c pas ajouté...';
            require("exercice/views/listExoView.php");

          }
        } 
      } catch(Exception $e) {
        echo "** ERREUR ** : ". $e->getMessage();
      }
    }

    /* --- */ 

  } elseif ($routeur == "deleteExoView") {

    require("exercice/views/deleteExoView.php");

  } elseif ($routeur == "deleteExo") {

    if (isset($_GET['exoId'])) {

      try {
        $exoId = htmlspecialchars(($_GET['exoId']));

        $isExistExo = $exoManager->isExistExo($exoId);

        if ($isExistExo) {

          $affectedLines = $exoManager->delete($exoId);

          if ($affectedLines) {
            echo 'ok, c\'est supprimer';
            $_POST = [];
            $listExo = $exoManager->getList();

            require("exercice/views/listExoView.php");
        
          } else {
            echo 'et bé non, c pas supprimé...';
            require("exercice/views/listExoView.php");

          }
        } 
      } catch(Exception $e) {
        echo "** ERREUR ** : ". $e->getMessage();
      }
    }
  }
} else {

  require("exercice/views/listExoView.php");
}