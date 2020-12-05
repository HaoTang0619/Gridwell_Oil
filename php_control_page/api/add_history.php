<?php
$field = $_POST["field"];
$name = $_POST["name"];
$record = $_POST["record"];

$site = explode("/", $_SERVER['REQUEST_URI'])[1];
include $_SERVER["DOCUMENT_ROOT"] . "/" . $site . "/api/mysql.php";

$conn = new mysqli($server_name, $username, $password, $database, $port);
if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}
mysqli_query($conn, "SET NAMES 'utf8'");

$stmt = $conn->prepare("INSERT INTO `history_?` (`name`, `record`) VALUES (?, ?)");
$stmt->bind_param("sss", $field, $name, $record);
$result = $stmt->execute();
if ($result) {
    $message = array("success" => true);
} else {
    $message = array("success" => false);
}
echo json_encode($message);
$conn->close();
