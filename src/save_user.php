<?php
header('Content-Type: application/json');

$host = "localhost";       // Your DB host
$user = "root";            // Your DB username
$pass = "";    // Your DB password
$db   = "music-form";      // Your DB name

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'error' => $conn->connect_error]));
}

// Get POST data
$data = json_decode(file_get_contents("php://input"), true);
$name    = $conn->real_escape_string($data['name']);
$email   = $conn->real_escape_string($data['email']);
$address = $conn->real_escape_string($data['address'] ?? '');

if (!$name || !$email || !$address) {
    echo json_encode(['success' => false, 'error' => 'Name, email, and address are required']);
    exit;
}

// Insert into DB
$sql = "INSERT INTO users (name, email, address) VALUES ('$name', '$email', '$address')";
if ($conn->query($sql) === TRUE) {
    echo json_encode(['success' => true, 'id' => $conn->insert_id]);
} else {
    echo json_encode(['success' => false, 'error' => $conn->error]);
}

$conn->close();
?>
