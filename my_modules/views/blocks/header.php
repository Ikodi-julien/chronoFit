<header>
  <nav>
    <ul>
      <li><a href="./index.php"
          ><i data-feather="home"></i></a></li>
      <li><a href="./index.php?routeur=timer"
          ><i data-feather="watch"></i></a></li>
      <li><a href="./index.php?routeur=getExercices">
          <i data-feather="dribbble"></i></a></li>
      <li><a href="./index.php?routeur=profil"
          ><i data-feather="user"></i></a></li>

      <?php if (isset($_SESSION['login']) && $_SESSION['login']) { ?>
        
      <li><a href="./index.php?routeur=disconnect"
          ><i data-feather="log-out"></i></a></li>
          
      <?php } else { ?>
        
      <li><a href="./indexLogin.php?routeur=login"
          ><i data-feather="log-in"></i></a></li>
          
      <?php } ?>
    </ul>
  </nav>
</header>
