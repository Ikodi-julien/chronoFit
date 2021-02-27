<?php
$css = "style.css";
$title = "Création d'exercice - ChronoFit";
$mainCatManager = new MainCatManager;
$bodyPartManager = new BodyPartManager;
$mainCatList = $mainCatManager->getList();
$nMainCat = count($mainCatList);
$bodyPartList = $bodyPartManager->getList();
$nBodyPart = count($bodyPartList);

ob_start();
?>
<div class="content">

  <div class="insertExo">
    <h3>Créer un exercice</h3>
    <form action="exerciceIndex.php?routeur=insertExo" method="post">
      <label for="exoName">Nom : <input type="text" name="exoName" id=""></label>
      <label for="exoDescription">Description: <textarea name="exoDescription" id="" cols="50" rows="10"></textarea></label>

      <label for="exoMainCat">Catégorie : </label>
        <select name="exoMainCat" id="exoMainCat">
        <?php
          for ($i = 0; $i < $nMainCat; $i ++) {
            echo '<option value="'. $mainCatList[$i]['name'].'">'.$mainCatList[$i]['name'].'</option>';
          }
          ?>
        </select>

      <label for="exoBodyPart">Partie du corps concernée : </label>
        <select name="exoBodyPart" id="exoBodyPart">
        <?php
          for ($i = 0; $i < $nBodyPart; $i ++) {
            echo '<option value="'. $bodyPartList[$i]['name'].'">'.$bodyPartList[$i]['name'].'</option>';
          }
          ?>
        </select> 

      <input type="submit" value="Créer l'exercice" name="createExo">
    </form>
  </div>
</div>

<?php
$content = ob_get_clean();
require("common/template.php");

?>