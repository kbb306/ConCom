<html>
    <head>
        <link rel="stylesheet" href="css/styles.css">
    </head>
    <body>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <script src="scripts/activitychart.js"></script>
        <?php
            include("nav.html");
            session_start();
                    if (isset($_SESSION["name"])) {
                        $name = $_SESSION["name"];
                    }
                    else {
                        die("Unable to retrieve username.");
                    }
                    if ($name == "craigferson") {
                        header("location: admin.php");
                        exit();
                    }
                    $username = "root";
                    $password = "Legally18";
                    $servername = "localhost";
                    $dbname = "concom";
                    $conn = new mysqli($servername,$username,$password,$dbname);
                    $query = "SELECT * FROM userdata JOIN billingdata ON userdata.email = billingdata.email WHERE username = '$name'";
                    $result = $conn -> query($query);
                    if ($result -> num_rows > 0) {
                        while ($rows = $result -> fetch_assoc()) {
                            $plan = $rows["plan"];
                            $servers = $rows["servers"];
                            $price = $rows["price"];
                            $access = $rows["access"];
                            $email = $rows["email"];
                            $domain = $rows["domainname"];
                            $address = $rows["addr"];
                            $zip = $rows["zip"];
                            $phone = $rows["tel"];

                        }
                    }
                    

        if ($access = "Server") {
            $routing = "Internal ConCom Systems";
        }     
        elseif ($access = "Rootkit") {
            $routing = "AutoDNS";
        }     
        else {
            $routing = "Third party DNS";
        }
        print "<div id=info>
                    <h2>Account Info</h2>
                    <p>Username: $name</p>
                    <p>Email: $email</p>
                    <p>Phone: $phone</p>
                    <p>Domain: $domain.concomcompany.com</p>
                    <p>Routing: $routing</p>
                </div>";
        print "<div id='billing'>
                    <h2>Billing Info</h2>
                    <p>Monthly Payment: $$price</p>
                    <p>Billing Address: $address $zip</p>
            </div>";
        print "<h2>Server Traffic</h2>";
        if ($access == "DNS") {
            print "<canvas id='nope' height='150' width='500'>
                        Your browser does not support the canvas element
                </canvas>";
        }

        else {
            print "<canvas id='Activity' height='150' width='500'>
                Your browser does not support the canvas element
            </canvas>"; 
        }

        print "<script>chartCore($price, '$plan', $servers)</script>"
        ?>
    </body>
</html>

    