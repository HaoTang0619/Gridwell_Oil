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

$stmt = $conn->prepare("UPDATE `mobile_$field` SET `a` = ?, `b` = ? WHERE `id` = ?");
$stmt->bind_param("ssd", $new_a, $new_b, $id);
$result = $stmt->execute();
if ($result) {
    $message = array("success" => true);
} else {
    $message = array("success" => false);
}
echo json_encode($message);
$conn->close();
