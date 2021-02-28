<?php

class TimelineManager extends DBConnexion {

  /* ---------------------------------------------- */

  public function add(Timeline $timeline) {
    // On encode en json
    $content = json_encode($timeline->content());
    //Requête d'insertion d'une instance de Timeline'
    $reqAdd = $this->db->prepare('
    INSERT INTO timeline(name, content)
    VALUES(:name, :content)
    ');

    $affectedLines = $reqAdd->execute(array(
      'name' => $timeline->name(),
      'content' => $content,
    ));

    return $affectedLines;    
  }

    /* ---------------------------------------------- */

  public function update(Timeline $timeline) {
    // Il faut déjà récup le nom de la timeline
    $timelineInDB = $this->get($timeline->name());

    // On encode le content avant d'envoyer en DB
    $content = json_encode($timeline->content());
    $id = $timelineInDB->id();

    $rqUpdate = $this->db->prepare("UPDATE timeline
    SET content=:content
    WHERE id=:id");

    $affectedLines = $rqUpdate->execute(array(
      'id' => $id,
      'content' => $content
    ));

    return $affectedLines;
  }

  /* ---------------------------------------------- */

  public function delete($timelineId) {

    $rqDelete = $this->db->prepare('
    DELETE FROM timeline
    WHERE id=:id');

    $affectedLines = $rqDelete->execute(array(
      'id' => $timelineId
    ));

    return $affectedLines;
  }
  /* ---------------------------------------------- */

  public function get($timelineName) {
    // echo $timelineName;
    try {
    //Requête d'un objet Timeline à partir de son name
    $reqName = $this->db->prepare('
    SELECT * FROM timeline WHERE `name`=:name');

    $reqName->execute(array(
        'name' => $timelineName,
    ));
    
    $data = $reqName->fetch(PDO::FETCH_ASSOC);

      if (!$data) {
        // echo 'Pas de data récup avec TimelineManager->get()';

      } else {
        // On ajoute l'id dans l'array
        $array = json_decode($data['content'], true);
        $array['id'] = $data['id'];
        return new Timeline($array);

      }
    } catch (Exception $e) {
      // Prévoir un header('Location: 404.html) avec $info = 'Problème dans TimelineManager->get()'
      echo ('Problème dans TimelineManager->get()' . $e->getMessage());
    }
  }

  /* ---------------------------------------------- */

  public function isExistTimelineId($timelineId) {

    $rq = $this->db->prepare('
    SELECT * FROM timeline WHERE id=:id');

    $rq->execute(array(
        'id' => $timelineId,
    ));
    
    $isExistTimeline = $rq->fetchColumn();

    return $isExistTimeline;
  }

  /* ---------------------------------------------- */

  public function isExistTimelineName(String $timelineName) {

    $rq = $this->db->prepare('
    SELECT * FROM `timeline` WHERE `name`=:name');

    $rq->execute(array(
        'name' => $timelineName,
    ));
    
    $isExistTimeline = $rq->fetchColumn();

    return $isExistTimeline;
  }

  /* ---------------------------------------------- */

  public function getTimelineNames() {
    //Retourne la liste de toutes les noms de timeline
    $reqTimelines = $this->db->query('SELECT `name` FROM timeline');

    while ($data = $reqTimelines->fetch(PDO::FETCH_COLUMN)) {
      $timelineNames[] = $data;
    };

    return $timelineNames;
  }
}