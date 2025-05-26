<?php
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Headers: Content-Type");
        header("Access-Control-Allow-Methods: POST, OPTIONS");
        http_response_code(200);
        exit();
    }

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Content-Type: application/json");

    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data["name"], $data["email"], $data["password"])) {
        $filePath = "users.json";

        $users = json_decode(file_get_contents($filePath), true);

        foreach ($users as $user) {
            if ($user["email"] === $data["email"]) {
                http_response_code(409);
                echo json_encode(["error" => "El email ya está registrado."]);
                exit;
            }
        }

        $newUser = [
            "@type" => "Person",
            "name" => $data["name"],
            "email" => $data["email"],
            "identifier" => uniqid("u"),
            "password" => $data["password"]
        ];

        $users[] = $newUser;
        file_put_contents($filePath, json_encode($users, JSON_PRETTY_PRINT));

        echo json_encode(["success" => true]);
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Faltan datos del usuario."]);
    }
?>