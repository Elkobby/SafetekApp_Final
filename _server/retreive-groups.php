<?php
   header('Access-Control-Allow-Origin: *');

   // Define database connection parameters
   $hn      = 'localhost';
   $un      = 'root';
   $pwd     = 'password';
   $db      = 'safely';
   $cs      = 'utf8';

   // Set up the PDO parameters
   $dsn  = "mysql:host=" . $hn . ";port=3306;dbname=" . $db . ";charset=" . $cs;
   $opt  = array(
                        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
                        PDO::ATTR_EMULATE_PREPARES   => false,
                       );
   // Create a PDO instance (connect to the database)
   $pdo  = new PDO($dsn, $un, $pwd, $opt);

   // Retrieve specific parameter from supplied URL
   $key  = strip_tags($_REQUEST['key']);
   //$key = "gmembers";
   $data    = array();

   // Determine which mode is being requested
   switch($key)
   {

      // Add a new record to the technologies table
      case "gname":

         // Sanitise URL supplied values
         $mId 		= filter_var($_REQUEST['mId'], FILTER_SANITIZE_NUMBER_INT, FILTER_FLAG_ENCODE_LOW);
         //$mId = 2;

         // Attempt to run PDO prepared statement
         try {
            $sql ="SELECT group.name FROM safely.group INNER JOIN meetpoint ON meetpoint.gId = safely.group.gId 
            WHERE meetpoint.mId = :mId LIMIT 1";
            $stmt    =  $pdo->prepare($sql);
            $stmt->bindParam(':mId', $mId, PDO::PARAM_INT);
            $stmt->execute();
            while($row  = $stmt->fetch(PDO::FETCH_OBJ))
            {
               // Assign each row of data to associative array
               $data = $row->name;
               //echo $row->gId;
               //echo $row['gId'];
            }

            // Return data as JSON
            echo json_encode($data);
         }
         catch(PDOException $e)
         {
            echo $e->getMessage();
         }

      break;



      // Update an existing record in the technologies table
      case "isgroup":

         // Sanitise URL supplied values
         $mId 		= filter_var($_REQUEST['mId'], FILTER_SANITIZE_NUMBER_INT, FILTER_FLAG_ENCODE_LOW);
         //$mId = 2;
         //echo "mid = ".$mId;
         
         // Attempt to run PDO prepared statement
         try {
            $sql 	= "SELECT gId FROM meetpoint WHERE mId = :mId";
            $stmt 	=	$pdo->prepare($sql);
            $stmt->bindParam(':mId', $mId, PDO::PARAM_INT);
            $stmt->execute();
            while($row  = $stmt->fetch(PDO::FETCH_OBJ))
            {
               // Assign each row of data to associative array
               $data = $row->gId;
               //echo $row->gId;
               //echo $row['gId'];
            }

            echo json_encode($data);
         }
         // Catch any errors in running the prepared statement
         catch(PDOException $e)
         {
            echo $e->getMessage();
         }

      break;



      // Remove an existing record in the technologies table
      case "tmembers":

         // Sanitise supplied record ID for matching to table record
         $gId	=	filter_var($_REQUEST['gId'], FILTER_SANITIZE_NUMBER_INT);

         // Attempt to run PDO prepared statement
         try {
            $pdo 	= new PDO($dsn, $un, $pwd);
            $sql 	= "SELECT COUNT(sId) AS members FROM student WHERE student.gId= :gId";
            $stmt 	= $pdo->prepare($sql);
            $stmt->bindParam(':gId', $gId, PDO::PARAM_INT);
            $stmt->execute();
            $row  = $stmt->fetch();
            echo json_encode($row["members"]);
         }
         // Catch any errors in running the prepared statement
         catch(PDOException $e)
         {
            echo $e->getMessage();
         }

      break;

      case "hname":

         // Sanitise supplied record ID for matching to table record
         $hId  =  filter_var($_REQUEST['hId'], FILTER_SANITIZE_NUMBER_INT);

         // Attempt to run PDO prepared statement
         try {
            $pdo  = new PDO($dsn, $un, $pwd);
            $sql  = "SELECT name FROM hostel WHERE hId= :hId limit 1";
            $stmt    = $pdo->prepare($sql);
            $stmt->bindParam(':hId', $hId, PDO::PARAM_INT);
            $stmt->execute();
            $row  = $stmt->fetch();
            echo json_encode($row['name']);

            //echo json_encode('Congratulations the record ' . $name . ' was removed');
         }
         // Catch any errors in running the prepared statement
         catch(PDOException $e)
         {
            echo $e->getMessage();
         }

      break;

      case "gmembers":

         // Sanitise supplied record ID for matching to table record
         $gId  =  filter_var($_REQUEST['gId'], FILTER_SANITIZE_NUMBER_INT);
         //$gId = 16;
         // Attempt to run PDO prepared statement
         try {
            $pdo  = new PDO($dsn, $un, $pwd);
            $sql  = "SELECT avatar, CONCAT(firstname, ' ', lastname) as fullname FROM student JOIN safely.group ON student.gId=safely.group.gId WHERE student.gId= :gId";
            $stmt    = $pdo->prepare($sql);
            $stmt->bindParam(':gId', $gId, PDO::PARAM_INT);
            $stmt->execute();
            while($row  = $stmt->fetch(PDO::FETCH_OBJ))
            {
               // Assign each row of data to associative array
               $data[] = $row;
               //echo $row->gId;
               //echo $row['gId'];
            }

            // Return data as JSON
            echo json_encode($data);
            //echo json_encode('Congratulations the record ' . $name . ' was removed');
         }
         // Catch any errors in running the prepared statement
         catch(PDOException $e)
         {
            echo $e->getMessage();
         }

      break;

      case "create":

         // Sanitise supplied record ID for matching to table record
         //$gId  =  filter_var($_REQUEST['gId'], FILTER_SANITIZE_NUMBER_INT);
         $gname = filter_var($_REQUEST['gname'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         $mId  = filter_var($_REQUEST['mId'], FILTER_SANITIZE_NUMBER_INT);
         $sId  = filter_var($_REQUEST['sId'], FILTER_SANITIZE_NUMBER_INT);
         //$gname = "test";
         //$mId = 2;
         //$sId = 1;
         // Attempt to run PDO prepared statement
         //add group and update meetpoints table
         try {
            //Insert into group table
            $pdo  = new PDO($dsn, $un, $pwd);
            $sql  = "INSERT INTO `group` (`gId`, `name`, `time`) VALUES (NULL, :gname, now())";
            $stmt    = $pdo->prepare($sql);
            $stmt->bindParam(':gname', $gname, PDO::PARAM_STR);
            $stmt->execute();
            $gId = $pdo->lastInsertId();


            //update meetponits table (mid)
            $sql ="UPDATE `meetpoint` SET `gId` = :gId WHERE `meetpoint`.`mId` = :mId";
            $stmt    = $pdo->prepare($sql);
            $stmt->bindParam(':gId', $gId, PDO::PARAM_INT);
            $stmt->bindParam(':mId', $mId, PDO::PARAM_INT);
            $stmt->execute();

            //update student table
            $sql  = "UPDATE `student` SET `gId` = :gId WHERE `student`.`sId` = :sId;";
            $stmt    = $pdo->prepare($sql);
            $stmt->bindParam(':gId', $gId, PDO::PARAM_INT);
            $stmt->bindParam(':sId', $sId, PDO::PARAM_INT);
            $stmt->execute();

            echo json_encode($gId);
         }
         // Catch any errors in running the prepared statement
         catch(PDOException $e)
         {
            echo $e->getMessage();
         }

      break; 

      case "update":

         // Sanitise supplied record ID for matching to table record
         $gId  = filter_var($_REQUEST['gId'], FILTER_SANITIZE_NUMBER_INT);
         $sId  = filter_var($_REQUEST['sId'], FILTER_SANITIZE_NUMBER_INT);

         // Attempt to run PDO prepared statement
         //add group and update meetpoints table
         try {
            //UPDATE `student` SET `gId` = '3' WHERE `student`.`sId` = 3;
            $pdo  = new PDO($dsn, $un, $pwd);
            $sql  = "UPDATE `student` SET `gId` = :gId WHERE `student`.`sId` = :sId;";
            $stmt    = $pdo->prepare($sql);
            $stmt->bindParam(':gId', $gId, PDO::PARAM_INT);
            $stmt->bindParam(':sId', $sId, PDO::PARAM_INT);
            $stmt->execute();

            echo json_encode($sId);
         }
         // Catch any errors in running the prepared statement
         catch(PDOException $e)
         {
            echo $e->getMessage();
         }

      break;      
     

   }

?>
