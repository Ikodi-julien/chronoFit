<?php
$css = "style.css";
$title = "Accueil ChronoFit";

ob_start();
?>
<h1>Accueil</h1>

<div class="landing">
<button class="--big-button"><a href="./indexTimer.php">Timer</a></button>
<button class="--big-button"><a href="./indexExercices.php">Exercices</a></button>
<button class="--big-button"><a href="./indexTrainings.php">Trainings</a></button>
<button class="--big-button"><a href="./indexProfil.php">Paramètres</a></button>
<button class="--big-button"><a href="./index.php">Déconnexion</a></button>
</div>

<?php
$content = ob_get_clean();
require("common/template.php");

?>