<?php
$accessToken = $_POST["accessToken"];
$accessArray = explode("|", $accessToken, 3);
$acc = isset($accessArray[1]) ? $accessArray[1] : null;
$token = isset($accessArray[0]) ? $accessArray[0] : null;
$field = isset($accessArray[2]) ? $accessArray[2] : null;

if ($acc === null || $token === null) {
    $message = array("valid" => false);
    echo json_encode($message);
    return;
}

$site = explode("/", $_SERVER['REQUEST_URI'])[1];
include $_SERVER["DOCUMENT_ROOT"] . "/" . $site . "/api/mysql.php";

$conn = new mysqli($server_name, $username, $password, $database, $port);
if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}
mysqli_query($conn, "SET NAMES 'utf8'");

$stmt = $conn->prepare("SELECT * FROM permission WHERE account = ?");
$stmt->bind_param("s", $acc);
$stmt->execute();
$result = $stmt->get_result();
if (mysqli_num_rows($result)) {
    $res = $result->fetch_assoc();
    if ($token === hash("sha256", $res["password"])) {
        $message = array("acc" => $res["name"] ,"valid" => true, "fields" => $field);
    } else {
        $message = array("valid" => false);
    }
} else {
    $message = array("valid" => false);
}
echo json_encode($message);
$conn->close();
