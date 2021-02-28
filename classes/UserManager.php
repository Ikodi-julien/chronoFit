<?php

class UserManager extends DBConnexion {
  
  /**
   * Add a User instance
   */
  public function add(User $user) {
    //Requête d'insertion d'une instance de user
    $reqAdd = $this->db->prepare('
    INSERT INTO user(pseudo, firstname, lastname, email, password)
    VALUES(:pseudo, :firstname, :lastname, :email, :password)
    ');

    $affectedLines = $reqAdd->execute(array(
      ':pseudo' => $user->pseudo(),
      ':firstname' => $user->firstname(),
      ':lastname' => $user->lastname(),
      ':email' => $user->email(),
      ':password' => $user->password()
    ));

    return $affectedLines;    
  }

  /**
   * get a User by Id
   */
  public function getById($userId) {
    //Requête d'un objet user à partir de son id
    $reqId = $this->db->prepare('
    SELECT * FROM user WHERE id=:id');

    $reqId->execute(array(
        'id' => $userId,
    ));
    
    $data = $reqId->fetch(PDO::FETCH_ASSOC);

    return new User($data);
  }
  
    /**
   * get a User by Id
   */
  public function getByEmail($email) {
    //Requête d'un objet user à partir de son email
    $reqEmail = $this->db->prepare("
    SELECT id, firstname, lastname, pseudo, email, password, level_id 
    FROM user WHERE email=:email
    ");

    $reqEmail->execute(array(
        'email' => $email,
    ));
    
    $data = $reqEmail->fetch(PDO::FETCH_ASSOC);

    if ($data) {
      
    return new User($data);
    }
    return $data;
  }

  /**
   * Performs a query for a user by  id
   */
  public function isExistuserById($userId) {

    $rq = $this->db->prepare('
    SELECT * FROM user WHERE id=:id');

    $rq->execute(array(
        'id' => $userId,
    ));
    
    $isExistuser = $rq->fetchColumn();

    return $isExistuser;
  }

  /**
   * Gets all Users, returns User instances
   * 
   */
  public function getList() {
    //Retourne la liste de tous les users
    $users = [];
    $requsers = $this->db->query('SELECT * FROM user');

    while ($data = $requsers->fetch(PDO::FETCH_ASSOC)) {
        $users[] = new user($data);
    }

    return $users;
  }

  /**
   * Updates a User 
   * @param (User) - Une instance de User
   */
  public function update(User $user) {

    $rqUpdate = $this->db->prepare('
    UPDATE user
    SET firstname=:firstname, lastname=:lastname, pseudo=:pseudo, email=:email, password=:password 
    WHERE id=:id');

    $affectedLines = $rqUpdate->execute(array(
      'id' => $user->id(),
      'firstname' => $user->firstname(),
      'lastname' => $user->lastname(),
      'pseudo' => $user->pseudo(),
      'email' => $user->email(),
      'password' => $user->password()
    ));

    return $affectedLines;
  }

  /**
   * Deletes a User by Id
   */
  public function delete($userId) {

    $rqDelete = $this->db->prepare('
    DELETE FROM user
    WHERE id=:id');

    $affectedLines = $rqDelete->execute(array(
      'id' => $userId
    ));

    return $affectedLines;
  }
}