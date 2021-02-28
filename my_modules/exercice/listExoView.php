<?php
$css = "style.css";
$title = "Liste exercices - ChronoFit";
$js1 = "show_info.js";

ob_start();
?>
<div class="content">

  <h1>Liste des exercices</h1>

  <?php
    foreach ($listExo as $exo) {
      echo '<fieldset>';
      echo '<p>Nom : ' . $exo->name() . '</p>';
      echo '<p>Catégorie : ' . getMainCat($exo) . '</p>';
      echo '<p>Partie du corp ciblée : ' . getBodyPart($exo) . '</p>';
      echo '<p>Description : ' . $exo->description() . '</p>';
      echo '<a href="indexExercices.php?routeur=updateExoView&amp;exoId='. $exo->id() . '"><button>Modifier</button></a>';
      echo '<a href="indexExercices.php?routeur=deleteExoView&amp;exoId='. $exo->id() . '"><button>Supprimer</button></a>';
      echo '</fieldset>';
    }
  ?>

  <a href="exerciceIndex.php?routeur=insertExoView"><button>Ajouter un exercice</button></a>

</div>

<?php
$content = ob_get_clean();
require("./my_modules/views/template.php");

?>