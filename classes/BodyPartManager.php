<?php

class BodyPartManager extends DBConnexion {

  public function getList() {
    
    $rqMainCatList = $this->db->query(
      'SELECT `name`
      FROM bodyPart'
    );

    $mainCatList = $rqMainCatList->fetchAll(PDO::FETCH_ASSOC);
    
    return $mainCatList;
  }
}