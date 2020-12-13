<?php

class MainCatManager extends DBConnexion {

  public function getList() {
    
    $rqMainCatList = $this->db->query(
      'SELECT `name`
      FROM mainCat'
    );

    $mainCatList = $rqMainCatList->fetchAll(PDO::FETCH_ASSOC);
    
    return $mainCatList;
  }
}