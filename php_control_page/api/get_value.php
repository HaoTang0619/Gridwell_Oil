<?php
$field = $_POST["field"];
$num = $_POST["num"];

$site = explode("/", $_SERVER['REQUEST_URI'])[1];
include $_SERVER["DOCUMENT_ROOT"] . "/" . $site . "/api/mysql.php";

$conn = new mysqli($server_name, $username, $password, $database, $port);
if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}
mysqli_query($conn, "SET NAMES 'utf8'");

$message = array();
for($i = 1; $i <= $num; $i++){
    $search = "SELECT * FROM `daily_$field` WHERE `device_id` = $i ORDER BY `register_time` DESC LIMIT 1";
    $result = $conn->query($search);
    if (mysqli_num_rows($result)) {
        while ($row = $result->fetch_assoc()) {
            $message[$i] = array(
                "signal" => $row["signal"], 
                "voltage" => $row["voltage"], 
                "status" => $row["status"], 
            );
        }
    }
}
echo json_encode($message);
$conn->close();
