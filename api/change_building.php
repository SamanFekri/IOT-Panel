<?php
/**
 * Created by PhpStorm.
 * User: SKings
 * Date: 10/31/2017
 * Time: 8:34 PM
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

    $dev_id = $_POST['ID'];
    $building_id = $_POST['Building_ID'];

    $stmt = $conn->prepare('DELETE FROM devices WHERE ID= :id');

    $stmt->execute(array('id' => $dev_id));

    $stmt = $conn->prepare('INSERT INTO devices VALUES (:id, :bid)');

    $stmt->execute(array('id' => $dev_id, 'bid' => $building_id));


} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}


$conn = null;