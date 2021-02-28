<?php

class Exercice {

  protected $id, $name, $description, $mainCat_id, $bodyPart_id;

  public function __construct($data) {
    $this->hydrate($data);
  }

  // HYDRATATION
  public function hydrate($data) {

    foreach($data as $key => $value) {

      $method = 'set'.ucfirst($key);

      if (method_exists($this, $method)) {
      $this->$method($value); 

      } else {
        echo 'problème d\'hydratation' .  $method ;
      }
    }
  }

  // SETTERS
  public function setId($id) {
      $id = (int) $id;
      if ($id > 0) {
          $this->id = $id;
      }
  }

  public function setMainCat_id($mainCat_id) {
    $mainCat_id = (int) $mainCat_id;
    $this->mainCat_id = $mainCat_id;
  }

public function setBodyPart_id($bodyPart_id) {
  $body_part_id = (int) $bodyPart_id;
      $this->bodyPart_id = $bodyPart_id;
}

public function setName($name) {
  if (is_string($name)) {
      $this->name = $name;
  }
}

public function setDescription($description) {
    if (is_string($description)) {
      $this->description = $description;
    }
  }

  //GETTERS
  public function id() {return $this->id;}
  public function mainCat_id() {return $this->mainCat_id;}
  public function bodyPart_id() {return $this->bodyPart_id;}
  public function name() {return $this->name;}
  public function description() {return $this->description;}

}
