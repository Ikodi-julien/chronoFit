<?php

class ProfilManager extends DBConnexion {
  
  
  public function add(Profil $profil) {
    //Requête d'insertion d'une instance de Profil
    $reqAdd = $this->db->prepare('
    INSERT INTO profil(id, pseudo, firstname, lastname, email, password)
    VALUES(:id, :pseudo, :firstname, :lastname, :email, :password)
    ');

    $affectedLines = $reqAdd->execute(array(
      ':id' => $profil->id,
      ':pseudo' => $profil->pseudo,
      ':firstname' => $profil->firstname,
      ':lastname' => $profil->lastname,
      ':email' => $profil->email,
      ':password' => $profil->password
    ));

    return $affectedLines;    
  }

  public function get($profilId) {
    //Requête d'un objet Profil à partir de son id
    $reqId = $this->db->prepare('
    SELECT * FROM profil WHERE id=:id');

    $reqId->execute(array(
        'id' => $profilId,
    ));
    
    $data = $reqId->fetch(PDO::FETCH_ASSOC);

    return new Profil($data);
  }

  public function isExistprofil($profilId) {

    $rq = $this->db->prepare('
    SELECT * FROM profil WHERE id=:id');

    $rq->execute(array(
        'id' => $profilId,
    ));
    
    $isExistprofil = $rq->fetchColumn();

    return $isExistprofil;
  }


  public function getList() {
    //Retourne la liste de tous les profils
    $profils = [];
    $reqprofils = $this->db->query('SELECT * FROM profil');

    while ($data = $reqprofils->fetch(PDO::FETCH_ASSOC)) {
        $profils[] = new Profil($data);
    }

    return $profils;
  }

  public function update(Profil $profil) {

    $rqUpdate = $this->db->prepare('
    UPDATE profil
    SET firstname=:firstname, lastname=:lastname, pseudo=:pseudo, email=:email, password=:password 
    WHERE id=:id');

    $affectedLines = $rqUpdate->execute(array(
      'id' => $profil->id(),
      'firstname' => $profil->firstname(),
      'lastname' => $profil->lastname(),
      'pseudo' => $profil->pseudo(),
      'email' => $profil->email(),
      'password' => $profil->password()
    ));

    return $affectedLines;
  }


  public function delete($profilId) {

    $rqDelete = $this->db->prepare('
    DELETE FROM profil
    WHERE id=:id');

    $affectedLines = $rqDelete->execute(array(
      'id' => $profilId
    ));

    return $affectedLines;
  }
}