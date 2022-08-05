<?php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
    
    header("Access-Control-Allow-Origin: *");
    // header("Access-Control-Allow-Origin: http://localhost:3000");
    header('Content-Type: application/json');
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Methods: POST");
    include 'connection.php';
    
    $error = false;

    if(!$_GET["id"]) {
        $error = true;
        echo json_encode('Etwas ist schief gelaufen');
    }

    $statement = $pdo->prepare("SELECT id FROM profile WHERE user = :id");
    $statement->execute(array("id" => $_GET['id']));
    $res = $statement->fetchAll();

    if(count($res)>0){
        $result=[];
        
        foreach($res as $row) {
            array_push($result, $row['id']);
        }

        echo json_encode($result);
    }else{
        echo json_encode(NULL);
    }
?>