<?php
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
        $res = $statement->fetchAll();
        if (count($res) > 0) {
            $result = array(
                    "id" => "894707",
                    "user"=> 10,
                    "color"=> null,
                    "name"=> "Vinh Nguyen",
                    "position"=> "Bürgermeister",
                    "company"=> "Landeshauptstadt Dresden",
                    "phone"=> "+49 173 8168686",
                    "email"=> "vinh@dresden.de",
                    "website"=> "www.dresden.de",
                    "address"=> null,
            );
            echo json_encode($result);
        } else {
            $error = true;
            echo json_encode('Etwas ist schief gelaufen');
        }
    }
?>