<html>
    <body>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <script src="scripts/activitychart.js"></script>


    <?php
        session_start();
                if (isset($_SESSION["name"])) {
                    $name = $_SESSION["name"];
                }
                else {}
                $username = "root";
                $password = "Legally18";
                $servername = "localhost";
                $dbname = "concom";
                $conn = new mysqli($servername,$username,$password,$dbname);
                $query = "SELECT * FROM userdata WHERE username = '$name'";
                $result = $conn -> query($query);
                if ($result -> num_rows > 0) {
                    while ($rows = $result -> fetch_assoc()) {
                        $plan = $rows["plan"];
                        $servers = $rows["servers"];
                        $price = $rows["price"];
                    }
                }
    print "<canvas id=Activity></canvas>"; 
    print "<script>chartCore($price, '$plan', $servers)</script>"
    ?>
    