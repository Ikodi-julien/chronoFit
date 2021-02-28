<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="public/css/<?= $css;?>">
  <?php
  if (isset($jsTimer)) {
  echo '<script src="public/js/'.$jsTimer.'" type="module"></script>';
  }
  if (isset($js1)) {
  echo '<script src="public/js/'.$js1.'"></script>';
  }
  if (isset($js2)) {
  echo '<script src="public/js/'.$js2.'"></script>';
  }
  if (isset($js3)) {
  echo '<script src="public/js/'.$js3.'"></script>';
  }
  if (isset($js4)) {
  echo '<script src="public/js/'.$js4.'"></script>';
  }
  ?>
  <title><?= $title; ?></title>
</head>