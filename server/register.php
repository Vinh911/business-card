<?php
header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Origin: http://localhost:3000");
header('Content-Type: application/json');
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
include 'connection.php';

if (empty($_POST['email']) && empty($_POST['password'])) die();

if($_POST) {
    $error = false;
    $email = $_POST['email'];
    $password = $_POST['password'];
    
    if(!$error) {
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
            echo json_encode(6);
            echo json_encode('Beim Abspeichern ist leider ein Fehler aufgetreten');
        }
    } 
}else {
    echo json_encode('Nur via POST');
}
?>