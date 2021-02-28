<?php require('./my_modules/views/blocks/head.php'); ?>

<body>
  <div class="container">
    
<?php
require('./my_modules/views/blocks/message.php');
require('./my_modules/views/blocks/header.php');
echo $content;
?>

  </div>
  <script src="./vendor/feather.js"></script>
  <script>feather.replace()</script>
</body>
</html>