<?php
$action = $_POST['action'];


if ($action=='readfile'){
  $fileurl=$_POST['fileurl'];
  $contents = file_get_contents($fileurl);
  echo $contents;
}

elseif ($action == 'saveusers') {
	// $contents = $_POST['content'];
	// file_put_contents('http://app.journaldunseuljour.fr/server/db/users_from_wp.db', $contents);
	// echo 'success';
  $json = $_POST['content'];

  if (json_decode($json) != null)
  {
      echo $json;
      $file = fopen('https://app.journaldunseuljour.fr/server/db/users_from_wp.db','w');
      if (!$file) {
        echo "Impossible d'ouvrir le fichier distant pour écriture";
      }
      fwrite($file, $json);
      fclose($file);
      $response['status'] = 'success';
  }
  else
  {
      $response['status'] = 'error';
  }
  echo json_encode($response);

}




?>
