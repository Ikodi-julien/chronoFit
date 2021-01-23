<?php

class Timeline {

  protected $id, $name, $content;

  public function __construct(array $data) {
    $this->hydrate($data);
  }

  // HYDRATATION
  public function hydrate($data) {
    try {
      // On met l'id
      if (isset($data['id'])) {
      $this->setId($data);
      }

      // On met le content
      $this->setcontent($data);

      // On met le name
      $this->setName($data);

    } catch (Exception $e) {
      echo 'Erreur dans hydrate() de Timeline: ' . $e->getMessage();
    }
  }

/*----------------------------------*/

/**
 * Créé puis retourne une liste contenant la liste des noms d'exercice 
 * puis la liste des durées de ces exercices, à partir de $_POST.
 */
protected function createItemsList() {

  // On créé une liste utilisable à partir de $this->content()
  $content = $this->content();
  
  $listeIntervalsName = [];
  $listeIntervalsDuration = [];

  foreach ($content as $key => $value) {
      // On choisit la liste à remplir
      if (substr($key, 0, 4)  === 'name') {

        $listeIntervalsName[] = $value;

      } else if (substr($key, 0, 8)  === 'duration') {
        //
        $listeIntervalsDuration[] = $value;

      }
  }

  $listeIntervals = [$listeIntervalsName, $listeIntervalsDuration];

  return $listeIntervals;
}

/**
 * Recréé une liste d'intervals à partir du content de Timelmine
 */
public function recreateIntervalsList() {
    $listIntervals = $this->createItemsList();

    for ($index = 0; $index < count($listIntervals[0]); $index++) {

    // on créé une div qui contiendra l'interval dragable
  ?>
      <div class="drop" id="full__interval<?= $index; ?> ">
      <!-- On créé la div interval -->
        <div class="interval" 
        draggable="true"
        id="interval-<?= $index;?>"
        ondragstart="dragstart_handler(event)"
        >

          <!-- // on créé l'input "nom" -->
          <input type="text" 
          name="name-interval<?= $index; ?>" 
          value="<?= $listIntervals[0][$index]; ?>"
          class="timer__intervals__interval__item intervalName">

          <!-- // on créé l'input durée -->
          <input type="number" 
          name="duration-interval<?= $index; ?>" 
          value="<?= intval($listIntervals[1][$index]); ?>"
          class="timer__intervals__interval__item intervalDuration">

        </div>
      </div>

      <!-- // On fini par une div droppable vide -->
      <div class="drop" 
        ondrop="drop_handler(event)" 
        ondragover="dragover_handler(event)" 
        ondragleave="dragleave_handler(event)">
      </div>

  <?php
    }
}

/*-------------------------------------*/

  // SETTERS
  public function setId($data) {
      $id = (int) $data["id"];
      if ($id > 0) {
          $this->id = $id;
      }
  }

  public function setName($data) {
    $this->name = $data["timeline-name"];
  }

  public function setcontent($data) {
    if (is_array($data)) {

        $this->content = $data;
    }
}

  //GETTERS
  public function id() {return $this->id;}
  public function name() {return $this->name;}
  public function content() {return $this->content;}

}
