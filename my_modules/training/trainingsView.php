<?php
$css = "style.css";
$title = "Entrainements ChronoFit";

ob_start();
?>
<h1>Entraînements</h1>


<?php
$content = ob_get_clean();
require("views/template.php");

?>