<?php

class Profil extends DBConnexion{
  
  protected $id, $pseudo, $firstname, $lastname, $password, $email;
  
  public function __construct($data) {return $this->hydrate($data);}
  
  // Hydratation Methods
  public function hydrate($data) {
    
    foreach($data as $key => $value) {
      
      $method = 'set'.ucFirst($key);
      
      if (method_exists($this, $method)) {
        $this->$method($value);
      } else {
        echo 'Problème d\'hydratation'.$method;
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
  
  public function setPseudo($pseudo) {
    if (is_string($pseudo)) {
        $this->pseudo = $pseudo;
    }
  }

  public function setFirstname($firstname) {
    if (is_string($firstname)) {
        $this->firstname = $firstname;
    }
  }

  public function setLastname($lastname) {
    if (is_string($lastname)) {
        $this->lastname = $lastname;
    }
  }

  public function setEmail($email) {
    if (is_string($email)) {
        $this->email = $email;
    }
  }

  public function setPassword($password) {
    if (is_string($password)) {
        $this->password = $password;
    }
  }

  
  //GETTERS
  public function id() {return $this->id;}
  public function pseudo() {return $this->pseudo;}
  public function firstname() {return $this->firstname;}
  public function lastname() {return $this->lastname;}
  public function email() {return $this->email;}
  public function password() {return $this->password;}
}