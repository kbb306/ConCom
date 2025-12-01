<?php
    session_start();
            if (isset($_POST["name"])) {
                $name = $_POST["name"];
            }
            $username = "root";
            $password = "Legally18";
            $servername = "localhost";
            $dbname = "concom";
            $conn = new mysqli($servername,$username,$password,$dbname);
            $query = "SELECT plan, servers FROM userdata WHERE username = '$name'";
            $result = $conn -> query($query);
            if ($result -> numrows > 0) {
                while ($rows = $result -> fetch_assoc()) {
                    $plan = $rows["plan"];
                    $servers = $rows["servers"];
                }
            }
?>