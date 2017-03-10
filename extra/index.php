<?php
  // host name, your username, your password and the name of the database
  $conn = new mysqli ('localhost', '', '', 'safetek');

  if($conn->connect_error){
    die("connection failure: something wicked happened");
  }
   
  // get the HTTP method, path and body of the request
  $method = $_SERVER['REQUEST_METHOD'];
  $url = $_SERVER['QUERY_STRING'];
  $request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
  $input = json_decode(file_get_contents('php://input'),true);

  $url = $url? str_replace("%20", " ", $url):'';
  $conn->set_charset('utf8');
   
  // retrieve the table and key from the path
  $table = preg_replace('/[^a-z0-9_]+/i','',array_shift($request));
  $key = array_shift($request)+0;
   
  // escape the columns and values from the input object
  $columns = preg_replace('/[^a-z0-9_]+/i','',array_keys($input));
  $values = array_map(function ($value) use ($conn) {
    if ($value===null) return null;
    return $conn->real_escape_string((string)$value);
  },array_values($input));
   
  // build the SET part of the SQL command
  $set = '';
  for ($i=0;$i<count($columns);$i++) {
    $set.=($i>0?',':'').'`'.$columns[$i].'`=';
    $set.=($values[$i]===null?'NULL':'"'.$values[$i].'"');
  }
   
  // create SQL based on HTTP method
  switch ($method) {
    case 'GET':
      $sql = "select * from `$table`".($url?" WHERE ".$url:''); break;
    case 'PUT':
      $sql = "update `$table` set $set where id=$key"; break;
    case 'POST':
      $sql = "insert into `$table` set $set"; break;
    case 'DELETE':
      $sql = "delete `$table` where id=$key"; break;
  }
  // excecute SQL statement
  $result = $conn->query($sql);
   

  // die if SQL statement failed
  if (!$result) {
    http_response_code(404);
    die($conn->error());
  }
   
  // print results, insert id or affected row count
  if ($method == 'GET') {
    $arr = [];

    foreach ($result as $row) {
      $arr[] = $row;
    }
    $arr = array($table=>$arr);

    // headers of request
    header('Content-Type: application/json; charset=utf-8');
    header("date: ".date("l, jS M Y, H:i:s"));
    header("Expires: Cache-Control: no-cache");

    print json_encode($arr, JSON_PRETTY_PRINT);
  } elseif ($method == 'POST') {
    echo $conn->insert_id();
  } else {
    echo $conn->affected_rows();
  }
   
  // close mysql connection
  $conn->close();
?>