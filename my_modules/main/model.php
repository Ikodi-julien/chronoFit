<?php

function loadClass($classname) {
  require('./classes/' . $classname.'.php');
}

