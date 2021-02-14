<?php
$css = "style.css";
$title = "Accueil ChronoFit";

ob_start();
?>
<h1>Accueil</h1>

<div class="landing">
<button class="button__access"><a href="./indexLanding.php?routeur=timer">Timer</a></button>
<button class="button__access"><a href="./indexLanding.php?routeur=getExercices">Exercices</a></button>
<button class="button__access"><a href="./indexLanding.php?routeur=getTrainings">Trainings</a></button>
<button class="button__access"><a href="./indexLanding.php?routeur=profil">Paramètres</a></button>
<button class="button__access"><a href="./indexLanding.php?routeur=disconnect">Déconnexion</a></button>
</div>

<?php
$content = ob_get_clean();
require("common/template.php");

?>