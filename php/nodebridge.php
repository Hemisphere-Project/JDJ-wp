<?php
/*
function __autoload($class_name) {
	$class_name = str_replace('\\','/',$class_name);
	require_once("./$class_name.php");
}*/
require_once "DnodeSyncClient.php";

function dnode() {
	$dnode = new \DnodeSyncClient\Dnode();
	return $dnode->connect('localhost', 8086);
}

$action = $_POST['action'];

if ($action=='allevents'){
	$events = dnode()->call('allEvents', array('Hello, world!'));
	echo json_encode($events[0]);
	exit();
}
else if ($action=='adduser'){
	dnode()->call('addUser', array(json_decode($_POST['user'])));
	exit();
}

/*
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

}*/




?>
