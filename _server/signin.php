<?php require_once("_server-config.php"); ?>

<?php

	//angular http post to php 
$postdata = file_get_contents("php://input");
	if (isset($postdata)) {
		$request = json_decode($postdata);
		$reference	= filter_var($_REQUEST['reference'], FILTER_SANITIZE_NUMBER_INT);
		$index	= filter_var($_REQUEST['index'], FILTER_SANITIZE_NUMBER_INT);
		$password	= filter_var($_REQUEST['password'], FILTER_SANITIZE_STRING);
		$hash = hash('sha256', $password);


		

		if ($password != "" && $index != "" && $reference != "") {
			  $sql = "SELECT sId, firstname FROM student WHERE referenceNumber=:reference AND indexNumber=:index AND password=:hash";
              $stmt = $pdo->prepare($sql);
              $stmt->bindParam(':reference', $reference, PDO::PARAM_INT);
              $stmt->bindParam(':index', $index, PDO::PARAM_INT);
              $stmt->bindParam(':hash', $hash, PDO::PARAM_STR);
              $stmt->execute();
              $row  = $stmt->fetch(PDO::FETCH_OBJ);
              $numrows = $stmt->rowCount(); 
			  echo json_encode($row);
			  //echo json_encode($hash);
			if($numrows==1){
				header("HTTP/1.1 200 OK");
			}

			else {
				header("HTTP/1.1 401 Unauthorised", true, 401);
			}

		}

		else {
				header("HTTP/1.1 401 Unauthorised", true, 401);
			}
	}

?>