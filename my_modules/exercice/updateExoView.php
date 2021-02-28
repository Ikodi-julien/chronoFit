<?php
$css = "style.css";
$title = "Modifier un exercice - ChronoFit";
$js1 = "show_info.js";

ob_start();
?>

<div class="content">

  <div class="exo__update">
    <h1>Modifier un exercice</h1>
    <form
    action="exerciceIndex.php?routeur=updateExo&amp;exoId=<?= $exo->id();?>"
    method="post"
    class="exo__update__form">
      <label for="exoName">Nom : <input type="text" name="exoName" class="exo__update__form__input" id="" value="<?= $exo->name(); ?>"></label>
      <textarea name="exoDescription" class="exo__update__form__input" id="" cols="50" rows="10"><?= $exo->description(); ?></textarea>
      <label for="exoMainCat">Catégorie : <input type="text" name="exoMainCat" class="exo__update__form__input" id="" value="<?= getMainCat($exo); ?>"></label>
      <label for="exoBodyPart">Partie du corps concernée : <input type="text" name="exoBodyPart" class="exo__update__form__input" id="" value="<?= getBodyPart($exo); ?>"></label>

      <button type="submit" class="button__access" name="updateExo">Envoyer les modifs</button>
    </form>
  </div>

<?php

$content = ob_get_clean();

require("./my_modules/views/template.php");

?>