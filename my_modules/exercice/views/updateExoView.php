<?php
$css = "style.css";
$title = "Modifier un exercice - ChronoFit";

ob_start();

/* --- Modifier un exercice et l'enregistrer en base de données ---*/
if (isset($_GET['exoId'])) {

  if (!is_int($_GET['exoId']) && !$_GET['exoId'] > 0) {
    echo 'Si c\'est pas un nombre entier positif ça va pas le faire ...';

  } else {

    $exoId = htmlspecialchars($_GET['exoId']);
    $isExistExo = $exoManager->isExistExo($exoId);

    if ($isExistExo) {
      $exoToUpdate = $exoManager->get($exoId);

      $exoName = $exoToUpdate->name();
      $exoDescription = $exoToUpdate->description();
      $exoMainCat = $exoToUpdate->mainCat();
      $exoBodyPart = $exoToUpdate->bodyPart();

    } else {
      echo 'Il semblerait que l\'exercice demandé ' . $exoId . 'qu\'il n\'existe...';
    }
  }
?>
<div class="content">

  <div class="updateExo">
    <h3>Modifier un exercice</h3>
    <form action="exerciceIndex.php?routeur=updateExo&amp;exoId=<?= $exoId;?>" method="post">
      <label for="exoName">Nom : <input type="text" name="exoName" id="" value="<?= $exoName; ?>"></label>
      <label for="exoDescription">Description: <textarea name="exoDescription" id="" cols="50" rows="10"><?= $exoDescription; ?></textarea></label>
      <label for="exoMainCat">Catégorie : <input type="text" name="exoMainCat" id="" value="<?= $exoMainCat; ?>"></label>
      <label for="exoBodyPart">Partie du corps concernée : <input type="text" name="exoBodyPart" id="" value="<?= $exoBodyPart; ?>"></label>

      <input type="submit" value="Envoyer les modifs" name="updateExo">
    </form>
  </div>

<?php

} else {

  echo 'Problème avec $exoId qui serait pas précisé...';
}

$content = ob_get_clean();

require("common/template.php");

?>