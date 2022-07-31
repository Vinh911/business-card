<?php
    $ini = parse_ini_file('/home/sites/site100028895/bc.ini');
    
    $db_host = $ini['db_host'];
    $db_name = $ini['db_name'];
    $db_user = $ini['db_user'];
    $db_password = $ini['db_password'];

    try {
        $pdo = new PDO("mysql:host={$db_host};port=3306;dbname={$db_name}", $db_user, $db_password);
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
?>