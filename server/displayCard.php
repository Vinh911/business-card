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

    if(!$error) {
        $id = $_GET['id'];
        $statement = $pdo->prepare("SELECT * FROM profile WHERE id = :id");
        $statement->execute(array("id" => $id));
        $res = $statement->fetch();
        if ($res) {
            $result = array(
                    "id" => $res["id"],
                    "user"=> $res["user"],
                    "color"=> $res["color"],
                    "name"=> $res["name"],
                    "position"=> $res["position"],
                    "company"=> $res["company"],
                    "phone"=> $res["phone"],
                    "email"=> $res["email"],
                    "website"=> $res["website"],
                    "address"=> $res["address"],
            );
            echo json_encode($result);
        } else {
            $error = true;
            echo json_encode('Etwas ist schief gelaufen');
        }
    }
?>