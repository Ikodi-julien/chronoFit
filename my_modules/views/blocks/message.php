<?php

if (isset($_SESSION['message'])) {
?>

<p class="timer__info" id="timerInfo"> <?= $_SESSION['message']; ?></p>

<?php
  unset($_SESSION['message']);
}