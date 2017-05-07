<?php require_once("_server-config.php"); ?>

<?php
   //angular http post to php
   $postdata = file_get_contents("php://input");
	if (isset($postdata)) {
		$request = json_decode($postdata);
		$hId	= filter_var($_REQUEST['recordID'], FILTER_SANITIZE_NUMBER_INT);
		   // Attempt to query database table and retrieve data
		   try {
		      $sql ="SELECT meetpoint.location, meetpoint.mId FROM safely.meetpoint INNER JOIN safely.hostel_has_meetpoint ON 
		      hostel_has_meetpoint.meetpoint_mId = meetpoint.mId WHERE hostel_has_meetpoint.hostel_hId = :hId ORDER BY meetpoint.location ASC";
            $stmt 	=	$pdo->prepare($sql);
            $stmt->bindParam(':hId', $hId, PDO::PARAM_INT);
            $stmt->execute();
		      while($row  = $stmt->fetch(PDO::FETCH_OBJ))
		      {
		         // Assign each row of data to associative array
		         $data[] = $row;
		      }

		      // Return data as JSON
		      echo json_encode($data);
		   }
		   catch(PDOException $e)
		   {
		      echo $e->getMessage();
		   }
	}
	else{
		echo "Not called properly with right parameters!";
	}

?>

