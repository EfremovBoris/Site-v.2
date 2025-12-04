<?php
$servername = "localhost"; // e.g., 192.168.1.100 or mysql.yourdomain.com
$username = "u1060934_user_stat";
$password = "Qazwsxedc86";
$dbname = "u1060934_default";

// Создание соединения
$conn = new mysqli($servername, $username, $password, $dbname);

// Проверка соединения
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully: ". $username;

// Выполнение запросов...
// $sql = "SELECT * FROM your_table";
// $result = $conn->query($sql);

// Закрытие соединения
$conn->close();
?>