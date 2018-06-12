<?php

// get database connection
include_once '../config/database.php';

$database = new Database();

$file = $database->dump();

if (file_exists($file)) {

    $filename = "la-bottega-db-".date("d-m-Y-H-i").".sql";
    header('Content-Description: File Transfer');
    header('Content-Type: text/plain');
    header('Content-Disposition: attachment; filename='.$filename);
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: '.filesize($file));
    ob_clean();
    flush();
    readfile($file);
    $database->removeDump();
    exit;
} else {
  return false;
}
?>