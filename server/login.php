<?php
    header("Access-Control-Allow-Origin: *");
    // header("Access-Control-Allow-Origin: http://localhost:3000");
    header('Content-Type: application/json');
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Methods: POST");
    include 'connection.php';

    $postData = json_decode(file_get_contents('php://input'), true);
    $error = false;

    if(!$postData['email'] || !$postData['password']) {
        $error = true;
        echo json_encode('Falsche Parameter');
    }

    if(!$error) {
        $email = $postData['email'];
        $password = $postData['password'];
            
        $statement = $pdo->prepare("SELECT * FROM users WHERE email = :email");
        $result = $statement->execute(array('email' => $email));
        $user = $statement->fetch();

        if($user == false) {
            $error = true;
            echo json_encode('Die Email oder das Passwort sind falsch');
        }
    }

    if(!$error) {
        if(password_verify($password, $user['password'])) {
            $res = ['msg' => 'Du bist eingeloggt', 'token' => $user['id']];
            echo json_encode($res);
        } else {
            echo json_encode('Die Email oder das Passwort sind falsch');
        }
    }

?>