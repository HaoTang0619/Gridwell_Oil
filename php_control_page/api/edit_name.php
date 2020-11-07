<?php
$field = $_POST["field"];
$id = $_POST["id"];
$name = $_POST["name"];
$IP = $_POST["IP"];
$port_edit = $_POST["port"];

$site = explode("/", $_SERVER['REQUEST_URI'])[1];
include $_SERVER["DOCUMENT_ROOT"] . "/" . $site . "/api/mysql.php";

$conn = new mysqli($server_name, $username, $password, $database, $port);
if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}
mysqli_query($conn, "SET NAMES 'utf8'");

$search = "UPDATE `mobile_$field` SET `name` = '$name', `IP` = '$IP', `port` = $port_edit WHERE `id` = $id";
$result = $conn->query($search);
if ($result) {
    $message = array("success" => true);
} else {
    $message = array("success" => false);
}
echo json_encode($message);
$conn->close();
