<?php
$css = "style.css";
$title = "PROFIL ChronoFit";

ob_start();
?>
<h1>ESPACE MEMBRE</h1>


<?php
$content = ob_get_clean();
require("views/template.php");

?>