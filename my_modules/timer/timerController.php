<?php
require('./my_modules/main/mainController.php');
require("./my_modules/main/model.php");
spl_autoload_register('loadClass');

/*------------ VIEWS RENDERING ---------------------------*/

/*--------------------------------------------------*/

function getTimelineNames () {
  
  $timelineManager = new TimelineManager();
    
  // On récupe aussi les timelines pour affichage des noms dans le select
  $timelineNames = $timelineManager->getTimelineNames();

  return $timelineNames;
}

function getTimeline ($dataPost) {

  $timelineManager = new TimelineManager();
  $name = $dataPost["timeline-name"];
  // Le manager fait le job
  return $timelineManager->get($name);
}

function getTimelineByName($dataGET) {
  
  $timelineManager = new TimelineManager();
  
  $name = $_GET['timelineName'];
  if ($timeline = $timelineManager->get($name)) {
  $_SESSION['message'] = 'Récup OK';
  
  return $timeline; 

  } else {
  $_SESSION['message'] = 'Récup NOK' . $name;

  return false; 
  };
}


function manageTimeline ($dataPost) {
  
  // On htmlspecialchars les données dans POST
  $timelineData = checkChars($dataPost);

  // On créé un objet Timeline
  $timelineManager = new TimelineManager();
  $timeline = new Timeline($timelineData);

  // Cas update ou création d'une timeline, 
  // On ne change pas la timeline vide
  if ($timeline->name() != "Vide") {
    // on check si le nom est déjà dans la base, 
    if ($timelineManager->isExistTimelineName($timeline->name())) {

      /*----------- UPDATE --------------*/

      if ($timelineManager->update($timeline)) {
        // On indique que l'update a fonctionné
        $_SESSION['message'] = 'Update OK ';
        return $timeline->name();  
        
      } else {
        // On indique que l'update n'a pas fonctionné
        $_SESSION['message'] = 'Update NOK ';
      };
    } else {

      /*----------------- CREATE ----------------*/

      if ($timelineManager->add($timeline)) {
        // On indique que l'ajout a fonctionné
        $_SESSION['message'] = 'Timeline ajoutée';
        return $timeline->name();  
  
      } else {
        // On indique que l'ajout n'a pas fonctionné
        $_SESSION['message'] = 'Oups... ç\'a n\'a pas fonctionné.... ';
      };
    }
  } else {
    
    $_SESSION['message'] = "Il faut choisir un nom pour pouvoir enregistrer";
  }
    return false;
}

function deleteTimeline ($data) {
  $timelineManager = new TimelineManager();

  $timelineId = htmlspecialchars($data['timelineId']);
  // On fait le delete
  return $timelineManager->delete($timelineId);
      
}