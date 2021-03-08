<?php
    $message = array();
    if ( 0 < $_FILES['file']['error'] ) {
        $message = array("success" => false);
    }
    else {
        move_uploaded_file($_FILES['file']['tmp_name'], '../../images/image_' . $_POST['field'] . '_' . $_POST['nodeid'] . '.jpg');
        $message = array("success" => true);
    }
    echo json_encode($message);
?>