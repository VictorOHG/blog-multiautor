<?php

header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");

    $datos = [
        "username" => $_POST["username"],
        "email" => $_POST["email"],
        "contrasena" => $_POST["contrasena"] 
    ];

    $postData = json_encode($datos);
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, 'http://localhost:3000/users/postUsers');
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_HTTPHEADER, [
                'Content-Type: application/json',
                'Content-Length: ' . strlen($postData)
            ]);
            $response = curl_exec($ch);
            if (curl_errno($ch)) {
                return 'Error en cURL: ' . curl_error($ch);
            }else{
                return $response;
            }   
            curl_close($ch);
            header("Location: ../VISTA/contact.html");
?>