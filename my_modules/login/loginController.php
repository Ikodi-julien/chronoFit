<?php

function stdLoginControl($pseudo, $pass) {
  
  // On vérifie si le pseudo et le mot de passe existent
  $dataProfil = rqProfil($pseudo);

  if (!$dataProfil) {
    $_POST['pseudo'] = null;
    $_POST['mdp'] = null;
    $_SESSION['identification'] = 'Erreur de pseudo ou de mot de passe...';
    header('Location: index.php');

  } else {
    // Comparaison pass envoyé et celui dans la base.
    $is_pass_correct = password_verify($pass, $dataProfil['mdp']);

    // Comparaison mdp saisi et celui en bdd
    if ($is_pass_correct) {
        $_SESSION['pseudo'] = $pseudo;
        $_SESSION['style'] = $dataProfil['style'];
        $_SESSION['avatar'] = $dataProfil['avatar'];

        // On met les cookies si connexion auto coché
        if (isset($_POST['auto'])) {
        $pass_hache = password_hash($pass, PASSWORD_DEFAULT);
        setcookie('pseudo', $pseudo, time() + 3600*24*365, null, null, false, true);
        setcookie('pass_hache', $pass_hache, time() + 3600*24*365, null, null, false, true);
        }
        
        // Redirection vers raceView.php
        require("./view/raceViews/racesIndexView.php");
        
    } else {
      $_SESSION['identification'] = 'Erreur de pseudo ou de mot de passe...';
      header('Location: index.php');
    }
  }
}
