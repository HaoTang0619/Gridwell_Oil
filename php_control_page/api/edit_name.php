<?php
$field = $_POST["field"];
$id = $_POST["id"];
$name = $_POST["name"];
$IP = $_POST["IP"];
$port_edit = $_POST["port"];
$nodeID = $_POST["nodeid"];
$image_url = $_POST["imageUrl"];

$site = explode("/", $_SERVER['REQUEST_URI'])[1];
include $_SERVER["DOCUMENT_ROOT"] . "/" . $site . "/api/mysql.php";

$conn = new mysqli($server_name, $username, $password, $database, $port);
if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}
mysqli_query($conn, "SET NAMES 'utf8'");

$stmt = $conn->prepare("UPDATE `mobile_$field` SET `name` = ?, `IP` = ?, `port` = ?, `nodeID` = ?, `image` = ? WHERE `id` = ?");
$stmt->bind_param("ssddsd", $name, $IP, $port_edit, $nodeID, $image_url, $id);
$result = $stmt->execute();
if ($result) {
    $message = array("success" => true);
} else {
    $message = array("success" => false);
}
echo json_encode($message);
$conn->close();
