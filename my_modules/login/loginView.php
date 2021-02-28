<?php
$title = "Connexion";
$css = "style.css";
$js1 = "show_info.js";

ob_start();
?>


<form action="indexLogin.php" method="post" class="container__login__form">

    <input 
    type="email" 
    name="email" 
    placeholder="Email"
    class="container__login__form__item" 
    id="pseudo" >

    <input 
    type="password" 
    name="password" 
    placeholder="Mot de passe"
    class="container__login__form__item" 
    id="password">

  <button type="submit" class="button__access">LOGIN</button>

<a href="indexLogin.php?routeur=createProfilView" class="container__login__form__lostPass">
  <p >Créer un profil</p>
</a>
</form>



<?php
$content = ob_get_clean();
require("./my_modules/views/template.php");

?>