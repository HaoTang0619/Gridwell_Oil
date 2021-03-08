<?php
$acc = $_POST["acc"];
$pwd = $_POST["pwd"];

$site = explode("/", $_SERVER['REQUEST_URI'])[1];
include $_SERVER["DOCUMENT_ROOT"] . "/" . $site . "/api/mysql.php";

$conn = new mysqli($server_name, $username, $password, $database, $port);
if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}
mysqli_query($conn, "SET NAMES 'utf8'");

$stmt = $conn->prepare("SELECT * FROM `permission` WHERE `account` = ? AND `password` = ?");
$stmt->bind_param("ss", $acc, $pwd);
$stmt->execute();
$result = $stmt->get_result();
if (mysqli_num_rows($result)) {
    $message = array("token" => hash("sha256", $pwd) . "|" . $acc . "|" . $result->fetch_array(MYSQLI_ASSOC)["department"], "valid" => true);
} else {
    $message = array("valid" => false);
}
echo json_encode($message);
$conn->close();
