<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="css/<?= $css;?>">
  <script type= "module" src="<?= $js0; ?>"></script>
  <?php
  if (isset($js1)) {
  echo "<script src=".$js1."></script>";
  }
  if (isset($js2)) {
    echo "<script src=".$js2."></script>";
  }
  if (isset($js3)) {
    echo "<script src=".$js3."></script>";
  }
  if (isset($js4)) {
  echo "<script src=".$js4."></script>";
  }
  ?>
  <title><?= $title; ?></title>
</head>
<body>
  <div class="container">

<?php 
    require('./common/blocks/header.html');
?>


    <?php 
    echo $content;
    ?>

  </div>
  <script src="./vendor/feather.js"></script>
  <script>feather.replace()</script>
</body>
</html>