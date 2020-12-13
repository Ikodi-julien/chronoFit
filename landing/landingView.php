<?php
$css = "style.css";
$title = "Accueil ChronoFit";

ob_start();
?>
<h1>Accueil</h1>

<div class="landing">
<a href="./indexTimer.php"><button>Timer</button></a>
<a href="./indexExercices.php"><button>Exercices</button></a>
<a href="./indexTrainings.php"><button>Trainings</button></a>
<a href="./indexProfil.php"><button>Paramètres</button></a>
<a href="./index.php"><button>Déconnexion</button></a>
</div>

<?php
$content = ob_get_clean();
require("common/template.php");

?>