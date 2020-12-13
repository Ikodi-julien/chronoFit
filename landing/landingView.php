<?php
$css = "style.css";
$title = "Accueil ChronoFit";

ob_start();
?>
<h1>Accueil</h1>

<div class="landing">
<a href="./indexTimer.php"><button class="--big-button">Timer</button></a>
<a href="./indexExercices.php"><button class="--big-button">Exercices</button></a>
<a href="./indexTrainings.php"><button class="--big-button">Trainings</button></a>
<a href="./indexProfil.php"><button class="--big-button">Paramètres</button></a>
<a href="./index.php"><button class="--big-button">Déconnexion</button></a>
</div>

<?php
$content = ob_get_clean();
require("common/template.php");

?>