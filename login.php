<!DOCTYPE html>
<html>
    <head></head>
    <body>
        <form action="login.php" method=POST>
            <label>Enter your username and domain name as "USER@DOMAIN": &nbsp; <input type="text" name="notEmail"></label>
            <label>Enter your password: &nbsp; <input type="password" name="password"></label>
        </form> 
        <?php
            session_start()
            $username = "root";
            $password = "Legally18";
            $servername = "localhost";
            $dbname = "concom";
            $conn = new mysqli($servername,$username,$password,$dbname);
            $notEmail = $_POST["notEmail"];
            $password = $_POST["password"];
            $addrarray = explode("@",$notEmail);
            $name = $addrarray[0];
            $domain = $addrarray[1];
            $sql = "SELECT 'password' FROM 'UserData' WHERE 'name' = $name AND $domain";
            $result = $conn -> query($sql);
            while ($row = $result -> fetch_assoc()) {
                $pass = $row["password"];
                if (hash($password) = $pass) {
                    header("location: account.php")
                    exit()
                }
            }
            ?>
    </body>
</html> 