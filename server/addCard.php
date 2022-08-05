<?php
    header("Access-Control-Allow-Origin: *");
    // header("Access-Control-Allow-Origin: http://localhost:3000");
    header('Content-Type: application/json');
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Methods: POST");
    include 'connection.php';
    
    $postData = json_decode(file_get_contents('php://input'), true);
    $error = false;

    if(!$postData['user']){
        $error = true;
        echo json_encode('Etwas ist schief gelaufen');
    }

    if(!$error) {
        if(!$postData['name'] || !$postData['email']) {
            $error = true;
            echo json_encode('Bitte geben Sie einen Namen und eine E-Mail-Adresse an');
        }
    }

    if(!$error) {
        $name = $postData['name'];
        $email = $postData['email'];
        $user = $postData['user'];
        $id = $postData['id'];
        $postData['position'] ? $position = $postData['position'] : $position = Null;
        $postData['company'] ? $company = $postData['company'] : $company = Null;
        $postData['phone'] ? $phone = $postData['phone'] : $phone = Null;
        $postData['website'] ? $website = $postData['website'] : $website = Null;
        $postData['address'] ? $address = $postData['address'] : $address = Null;

        $statement = $pdo->prepare("INSERT INTO profile (id, user, name, email, position, company, phone, website, address) VALUES (:id, :user, :name, :email, :position, :company, :phone, :website, :address)");
        $result = $statement->execute(array('id' => $id, 'user' => $user, 'name' => $name, 'email' => $email, 'position' => $position, 'company' => $company, 'phone' => $phone, 'website' => $website, 'address' => $address));
        if($result) {
            echo json_encode('Deine Daten wurden erfolgreich gespeichert');
        } else {
            echo json_encode('Beim Abspeichern ist leider ein Fehler aufgetreten');
        }
    }
?>