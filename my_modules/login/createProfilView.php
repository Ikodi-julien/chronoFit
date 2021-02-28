<?php
$title = "Connexion";
$css = "style.css";
$js1 = "show_info.js";

ob_start();
?>


<form action="./indexLogin.php?routeur=createProfil" method="post" class="container__login__form">

    <input 
    type="text" 
    name="firstname" 
    placeholder="Prénom"
    class="container__login__form__item" 
    id="firstname" >

    <input 
    type="text" 
    name="lastname" 
    placeholder="Nom de famille"
    class="container__login__form__item" 
    id="lastname" >

    <input 
    type="email" 
    name="email" 
    placeholder="Email"
    class="container__login__form__item" 
    id="email" >

    <input 
    type="password" 
    name="password" 
    placeholder="Mot de passe"
    class="container__login__form__item" 
    id="password">

    <input 
    type="password" 
    name="password_confirm" 
    placeholder="Confirmer le mot de passe"
    class="container__login__form__item" 
    id="password_confirm">

  <button type="submit" class="button__access">OK</button>

</form>



<?php
$content = ob_get_clean();
require("./my_modules/views/template.php");

?>