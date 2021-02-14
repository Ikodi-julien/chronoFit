<?php
$title = "Connexion";
$css = "style.css";

ob_start();
?>


<form action="" method="post" class="container__login__form">

  <div class="container__login__form__row">
    <label for="pseudo" class="container__login__form__item">Pseudo</label>
    <input type="text" name="pseudo" class="container__login__form__item" id="pseudo" >
  </div>

  <div class="container__login__form__row">
    <label for="password" class="container__login__form__item">Mot de passe</label>
    <input type="password" name="password" class="container__login__form__item" id="password">
  </div>

  <button type="submit" class="button__access">LOGIN</button>

</form>



<?php
$content = ob_get_clean();
require("common/template.php");

?>