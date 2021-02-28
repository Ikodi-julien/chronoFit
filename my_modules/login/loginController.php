<?php
/*------------- VIEWS ------------------------------*/

function createProfilView() {
  
  require('./my_modules/login/createProfilView.php');
}


/*----------------- CONTROLLEUR --------------------*/

function stdLoginControl($data) {
  
  $email = htmlspecialchars($data['email']);
  $password = htmlspecialchars($data['password']);
  // On vérifie si l'email' et le mot de passe existent
  $userManager = new UserManager();
  $user = $userManager->getByEmail($email);

  if ($user) {
    
    // Comparaison pass envoyé et celui dans la base.
    if (password_verify($password, $user->password())) {
      $_SESSION['pseudo'] = $user->pseudo();
      $_SESSION['login'] = true;
      $_SESSION['message'] = 'Login ok';
        
      return true;
    } 
  }
      
  $_POST['email'] = null;
  $_POST['password'] = null;
  $_SESSION['message'] = 'Erreur de pseudo ou de mot de passe...';
  
  return false;

  //       // On met les cookies si connexion auto coché
  //       if (isset($_POST['auto'])) {
  //       $pass_hache = password_hash($pass, PASSWORD_DEFAULT);
  //       setcookie('pseudo', $pseudo, time() + 3600*24*365, null, null, false, true);
  //       setcookie('pass_hache', $pass_hache, time() + 3600*24*365, null, null, false, true);
  //       }
        
  //       // Redirection vers raceView.php
  //       require("./view/raceViews/racesIndexView.php");
        
  //   } else {
  //     $_SESSION['identification'] = 'Erreur de pseudo ou de mot de passe...';
  //     header('Location: index.php');
  //   }
  // }
}

function createProfil($dataArray) {

  // Ici faire une vérif si champs vides <-->
  foreach($dataArray as $key => $value) {
    if ($value === '') {
      
    $_SESSION['message'] = "Tous les champs doivent être remplis";
    
    return false;
    }
  }
  
  // Are passwords the same ?
  if ($dataArray['password'] !== $dataArray['password_confirm']) {
    
     $_SESSION['message'] = "Les mots de passe sont différents";
    return false;
  }
  
  // Ici hash du password <-->
  $dataArray['password'] = password_hash($dataArray['password'],PASSWORD_DEFAULT);
  
  // On supprime l'entrée qui ne servira plus
  unset($dataArray['password_confirm']);
  
  $user = new User($dataArray);
  
  // Is email in DB ?
  $userManager = new UserManager();
  
  if ($userManager->getByEmail($user->email())) {
    
    $_SESSION['message'] = 'Cette email existe déjà en DB...';
    return false;
  }
  
  // Create profil in DB
  if ($userManager->add($user)) {
    $_SESSION['message'] = 'Profile créé';
    
    return true;
  } else {
    $_SESSION['message'] = 'Hum... problème avec la base de données...';
    
    return false;
  }
}