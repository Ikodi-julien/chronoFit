<?php

class ExercicesManager extends DBConnexion {

  /* --- */

  public function add(Exercice $exo) {
    //Requête d'insertion d'une instance d'Exercice'
    $reqAdd = $this->db->prepare('
    INSERT INTO exercice(name, description, mainCat_id, bodyPart_id)
    VALUES(:name, :description, :mainCat_id, :bodyPart_id)
    ');

    $affectedLines = $reqAdd->execute(array(
      ':mainCat_id' => $exo->mainCat_id(),
      ':bodyPart_id' => $exo->bodyPart_id(),
      ':name' => $exo->name(),
      ':description' => $exo->description()
    ));

    return $affectedLines;    
  }

  public function get($exoId) {
    //Requête d'un objet Exercice à partir de son id
    $reqId = $this->db->prepare('
    SELECT * FROM exercice WHERE id=:id');

    $reqId->execute(array(
        'id' => $exoId,
    ));
    
    $data = $reqId->fetch(PDO::FETCH_ASSOC);

    return new Exercice($data);
  }

  public function isExistExo($exoId) {

    $rq = $this->db->prepare('
    SELECT * FROM exercice WHERE id=:id');

    $rq->execute(array(
        'id' => $exoId,
    ));
    
    $isExistExo = $rq->fetchColumn();

    return $isExistExo;
  }


  public function getList() {
    //Retourne la liste de tous les exercices
    $exos = [];
    $reqExos = $this->db->query('SELECT * FROM exercice');

    while ($data = $reqExos->fetch(PDO::FETCH_ASSOC)) {
        $exos[] = new Exercice($data);
    }

    return $exos;
  }

  public function update(Exercice $exo) {

    $rqUpdate = $this->db->prepare('
    UPDATE exercice
    SET name=:name, mainCat_id=:mainCat_id, bodyPart_id=:bodyPart_id, description=:description
    WHERE id=:id');

    $affectedLines = $rqUpdate->execute(array(
      'id' => $exo->id(),
      'name' => $exo->name(),
      'mainCat' => $exo->mainCat_id(),
      'bodyPart' => $exo->bodyPart_id(),
      'description' => $exo->description()
    ));

    return $affectedLines;
  }


  public function delete($exoId) {

    $rqDelete = $this->db->prepare('
    DELETE FROM exercice
    WHERE id=:id');

    $affectedLines = $rqDelete->execute(array(
      'id' => $exoId
    ));

    return $affectedLines;
  }
  
  public function getMainCat(Exercice $exo) {
    
    $rqMainCat = $this->db->prepare('
    SELECT `name` FROM `mainCat`
    WHERE `id`=:mainCat_id');
    
    $rqMainCat->execute(array(
      'mainCat_id' => $exo->mainCat_id()
    ));
    
    $mainCat = $rqMainCat->fetch(PDO::FETCH_ASSOC);
    
    return $mainCat['name'];
  }
    
  public function getBodyPart(Exercice $exo) {
    
    $rqMainCat = $this->db->prepare('
    SELECT `name` FROM `bodyPart`
    WHERE `id`=:bodyPart_id');
    
    $rqMainCat->execute(array(
      'bodyPart_id' => $exo->bodyPart_id()
    ));
    
    $bodyPart = $rqMainCat->fetch(PDO::FETCH_ASSOC);
    
    return $bodyPart['name'];
  }
}