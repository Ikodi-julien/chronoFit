<?php

class Exercice {

  protected $id, $mainCat, $bodyPart, $name, $description, $tool, $weighted, $weight, $reps;

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

  public function setTool($tool) {
    if (is_string($tool)) {
      $this->tool = $tool;
    }
  }

  public function setWeighted($weighted) {
    if (is_string($weighted)) {
      $this->weighted = $weighted;
    } 
  }

  public function setReps($reps) {
      $reps = (int) $reps;
      if ($reps >= 1 && $reps <= 2000) {
          $this->reps = $reps;
      }
  }

  public function setWeight($weight) {
      $weight = (int) $weight;
      if ($weight >= 1 && $weight <= 1050) {
          $this->weight = $weight;
      }
  }

  //GETTERS
  public function id() {return $this->id;}
  public function name() {return $this->name;}
  public function description() {return $this->description;}
  public function tool() {return $this->tool;}
  public function weighted() {return $this->weighted;}
  public function weight() {return $this->weight;}
  public function reps() {return $this->reps;}

}
