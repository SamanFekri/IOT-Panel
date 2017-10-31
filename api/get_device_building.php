<?php
/**
 * Created by PhpStorm.
 * User: SKings
 * Date: 10/31/2017
 * Time: 8:53 PM
 */
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "thesis";

$result = (object) array();

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $conn->prepare('SELECT building_ID FROM devices WHERE ID = :id');

    $stmt->execute(array('id' => $_POST['ID']));

    $stmt = $stmt->fetch(PDO::FETCH_ASSOC);

    echo json_encode($stmt);

} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}


$conn = null;