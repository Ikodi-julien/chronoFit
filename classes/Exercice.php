<?php

class Exercice {

  protected $id, $mainCat, $bodyPart, $name, $description;

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

  public function setMainCat($mainCat) {
    if (is_string($mainCat)) {
        $this->mainCat = $mainCat;
    }
}

public function setBodyPart($bodyPart) {
  if (is_string($bodyPart)) {
      $this->bodyPart = $bodyPart;
  }
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
  public function mainCat() {return $this->mainCat;}
  public function bodyPart() {return $this->bodyPart;}
  public function name() {return $this->name;}
  public function description() {return $this->description;}

}
