<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "thesis";

$result = (object) array();
try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $conn->prepare('SELECT * FROM users WHERE email = :email AND password = :password');

    $email = $_POST['email'];
    $password = $_POST['password'];

    $stmt->execute(array('email' => $email, 'password' => $password));

    $number = 0;
    foreach ($stmt as $row) {
        $number++;
    }

    if ($number == 1) {
        $result->code = 200;
        $result->status = "ok";
    } else {
        $result->status = "error";

        $stmt = $conn->prepare('SELECT * FROM users WHERE email = :email');
        $stmt->execute(array('email' => $email));

        $number = 0;

        foreach ($stmt as $row) {
            $number++;
        }

        if($number == 1){
            $result->code = 901;
            $result->message = "password is wrong";
        }else{
            $result->code = 900;
            $result->message = "username not exists";
        }

    }

    $result = json_encode($result);
    echo $result;

} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}


$conn = null;
?>