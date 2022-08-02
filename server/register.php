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
        
        if($user !== false) {
            echo json_encode('Diese E-Mail-Adresse ist bereits vergeben');
            $error = true;
        }
    }

    if(!$error) {
        $password_hash = password_hash($password, PASSWORD_DEFAULT);
        $statement = $pdo->prepare("INSERT INTO users (email, password) VALUES (:email, :password)");
        $result = $statement->execute(array('email' => $email, 'password' => $password_hash));
        
        if($result) {      
            echo json_encode('Du wurdest erfolgreich registriert');
        } else {
            echo json_encode('Beim Abspeichern ist leider ein Fehler aufgetreten');
        }
    }
?>