<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

// Konfigurasi database
$host = 'localhost';
$dbname = 'jarjournal';
$username = 'root';
$password = '';

try {
    // Koneksi ke database
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Menerima data dari POST request
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $username = $_POST['username'];
        $pass = $_POST['password'];
        $email = $_POST['email'];

        // SQL query untuk menyimpan data
        $sql = "INSERT INTO users (username, email, password) VALUES ($username, $email, $pass)";
        $stmt = $conn->prepare($sql);
        
        // Bind parameter
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $pass);

        // Eksekusi query
        if ($stmt->execute()) {
            echo json_encode(["message" => "Data berhasil disimpan"]);
        } else {
            echo json_encode(["message" => "Gagal menyimpan data"]);
        }
    }
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>
