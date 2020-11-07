<?php
$field = $_POST["field"];
$id = $_POST["id"];
$new_a = $_POST["new_a"];
$new_b = $_POST["new_b"];

$site = explode("/", $_SERVER['REQUEST_URI'])[1];
include $_SERVER["DOCUMENT_ROOT"] . "/" . $site . "/api/mysql.php";

$conn = new mysqli($server_name, $username, $password, $database, $port);
if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}
mysqli_query($conn, "SET NAMES 'utf8'");

$search = "UPDATE `mobile_$field` SET `a` = '$new_a', `b` = '$new_b' WHERE `id` = $id";
$result = $conn->query($search);
if ($result) {
    $message = array("success" => true);
} else {
    $message = array("success" => false);
}
echo json_encode($message);
$conn->close();
