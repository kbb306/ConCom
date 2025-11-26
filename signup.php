<!DOCTYPE html>
<html>
    <head>
        <title>
            Create your account
        </title>
    </head>
    <body>
        <?php 
            session_start();
            function getprev() {
                foreach($_POST as $key => $value) {
                    print "<input type='hidden' name='$key' value='$value'>";
                }
            }

            function upload($email,$name,$pass,$domain,$plan,$servers,$price,$access) {
                $username = "root";
                $password = "Legally18";
                $servername = "localhost";
                $dbname = "concom";
                $pass = hash("sha256",$pass);
                $domainarr = explode(".",$domain);
                $domain = $domainarr[1];
                $conn = new mysqli($servername,$username,$password,$dbname);
                $insert = "INSERT INTO userdata (email, username, password, domainname, plan, servers, price, access, isAdmin) $email $name $pass $domain $plan $servers $price $access False";
                $select = "SELECT * FROM userdata WHERE domain = '$domain'";
                $existing = $conn -> query($select);
                if ($existing -> num_rows > 0) {
                    print "Your domain name already exists";
                }
                else {
                    $result = $conn -> query($insert);
                    header("location: home.php");
                    exit();
                }
                    }
                function billupload($email,$fname,$lname,$addr,$tel,$zip) {
                    $username = "root";
                    $password = "Legally18";
                    $servername = "localhost";
                    $dbname = "concom";
                    $conn = new mysqli($servername,$username,$password,$dbname);
                    $insert = "INSERT INTO billingdata (email, fname, lname, addr, tel, zip) $email $fname $lname $addr $tel $zip";
                    $result = $conn -> query($insert)
                }
                
            if (isset($_POST["email"],$_POST["name"],$_POST["pass"],$_POST["domain"],$_POST["plan"],$_POST["plan"],$_POST["servers"],$_POST["price"],$_POST["access"],$_POST["fname"],$_POST["lname"],$_POST["address"],$_POST["phone"],$_POST["zip"])) {
                upload($_POST["email"],$_POST["name"],$_POST["pass"],$_POST["domain"],$_POST["plan"],$_POST["servers"],$_POST["price"],$_POST["access"]);
                billupload($_POST["email"],$_POST["fname"],$_POST["lname"],$_POST["address"],$_POST["phone"],$_POST["zip"]);
                header("location: home.php");
                exit();
            }

        ?>
    
            <form action="signup.php" method ="post">
                <h1>Create your account</h1>
                <label for="name">Enter a username: <input type="text" name="name" pattern="^.{,12}$" required></label>
                <label for="pass">Enter a password: <input type="password" name="pass" pattern="^.{,16}" required></label>
                <label for="domain">Enter your desired domain name: <input type="text" name="domain" pattern=".*[.]concomcompany[.]com$" require> </label>
                <?php getprev()?>
                <button type="submit" value="Submit">Submit</button>
            </form>
    </body>
</html>



