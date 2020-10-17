<?php
$field = $_POST["field"];

include $_SERVER["DOCUMENT_ROOT"] . "/IoT/api/mysql.php";

$conn = new mysqli($server_name, $username, $password, 'Mobile', $port);
if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}
mysqli_query($conn, "SET NAMES 'utf8'");

$search = "SELECT * FROM history_$field";
$result = $conn->query($search);
$message = array();
if (mysqli_num_rows($result)) {
    while ($row = $result->fetch_assoc()) {
        array_push($message, array(
            "time" => $row["register_time"], 
            "name" => $row["name"], 
            "record" => $row["record"], 
        ));
    }
}
echo json_encode($message);
$conn->close();
