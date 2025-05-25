<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Content-Type: application/json");

    $data = json_decode(file_get_contents("php://input"), true);

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }

    if (isset($data["score"], $data["comment"], $data["authorName"], $data["hotelName"])) {
        $filePath = "reviews.json";

        $reviews = json_decode(file_get_contents($filePath), true);

        $newReview = [
            "@type" => "Review",
                "author" => [
                    "@type" => "Person",
                    "name"  => $data["authorName"]
                ],
                "datePublished" => date('Y-m-d'),
                "reviewBody"    => $data["comment"],
                "reviewRating"  => [
                    "@type"      => "Rating",
                    "ratingValue"=> $data["score"],
                    "bestRating" => "10",
                    "worstRating"=> "0"
                ],
                "itemReviewed"  => [
                    "@type" => "Hotel",
                    "name"  => $data["hotelName"]
                ]
        ];

        $reviews[] = $newReview;
        file_put_contents($filePath, json_encode($reviews, JSON_PRETTY_PRINT));

        echo json_encode(["success" => true]);
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Faltan datos de la review."]);
    }
?>