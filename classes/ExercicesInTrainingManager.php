<?php

class ExercicesManager {

  private $_db;

  public function setDb(PDO $db) {
    $this->_db = $db;
  }

  public function __construct($db) {
    $this->setDb($db);
  }

  /* --- */



  public function add(Exercice $exo) {
    //Requête d'insertion d'une instance de Personnage
    $reqAdd = $this->_db->prepare('
    INSERT INTO exercice(name, description, tool, weighted, weight, reps)
    VALUES(:name, :description, :tool, :weighted, :weight, :reps)
    ');

    $reqAdd->bindValue(':name', $exo->name());
    $reqAdd->bindValue(':description', $exo->description());
    $reqAdd->bindValue(':tool', $exo->tool());
    $reqAdd->bindValue(':weighted', $exo->weighted());
    $reqAdd->bindValue(':weight', $exo->weight(), PDO::PARAM_INT);
    $reqAdd->bindValue(':reps', $exo->reps(), PDO::PARAM_INT);

    return $reqAdd->execute();    
  }

  public function getList() {
    //Retourne la liste de tous les exercices
    $exos = [];
    $reqExos = $this->_db->query('SELECT * FROM exercice');

    while ($data = $reqExos->fetch(PDO::FETCH_ASSOC)) {
        $exos[] = new Exercice($data);
    }

    return $exos;
  }


}