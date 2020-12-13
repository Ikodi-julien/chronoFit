<?php
$title = "Connexion";
$css = "style.css";

ob_start();
?>


<form action="" method="post">
  <label for="pseudo">Pseudo<input type="text" name="pseudo" id="pseudo"></label>
  <label for="password">Mot de passe<input type="password" name="password" id="password"></label>
  <button type="submit" class="--big-button">LOGIN</button>
</form>



<?php
$content = ob_get_clean();
require("common/template.php");

?>