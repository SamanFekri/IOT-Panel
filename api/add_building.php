<?php
/**
 * Created by PhpStorm.
 * User: SKings
 * Date: 10/30/2017
 * Time: 11:21 AM
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

    $stmt = $conn->prepare('INSERT INTO building(Name) VALUES (:mname)');

    $stmt->execute(array('mname' => $_POST['Name']));

//    $stmt = $stmt->fetchAll(PDO::FETCH_ASSOC);

//    echo json_encode($stmt);
//    if(sizeof($stmt) > 0){
//        $myfile = fopen($stmt['info_url'], "r+") or die("Unable to open file!");
//        echo fread($myfile,filesize($stmt['info_url']));
//        fclose($myfile);
//    } else{
//
//    }
//    foreach ($stmt as $row) {
//        $myfile = fopen($row->info_url, "r+") or die("Unable to open file!");
//        echo fread($myfile,filesize($row->info_url));
//        fclose($myfile);
//    }

} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}


$conn = null;