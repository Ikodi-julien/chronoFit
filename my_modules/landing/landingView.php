<?php
$css = "style.css";
$title = "Accueil ChronoFit";
$js1 = "show_info.js";

ob_start();
?>
<h1>Accueil</h1>

<div class="landing">
<button class="button__access"><a href="./index.php?routeur=timer">Timer</a></button>
<button class="button__access"><a href="./index.php?routeur=getExercices">Exercices</a></button>
<button class="button__access"><a href="./index.php?routeur=getTrainings">Trainings</a></button>
<button class="button__access"><a href="./index.php?routeur=profil">Paramètres</a></button>

<?php if (isset($_SESSION['login']) && $_SESSION['login']) { ?>
<button class="button__access"><a href="./index.php?routeur=disconnect">Déconnexion</a></button>
<?php } else { ?>
<button class="button__access"><a href="./index.php?routeur=login">Connexion</a></button>
<?php } ?>

</div>

<?php
$content = ob_get_clean();
require("./my_modules/views/template.php");

?>