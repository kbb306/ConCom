<!DOCTYPE html>
<html>
    <head>
        <title>
            Create your account
        </title>
    </head>
    <body>
        <?php 
            session_start()
            function getprev() {
                foreach($_POST, $key => $value) {
                    print "<input type='hidden' name='$key' value='$value'>"
                }
            }

             function upload($name,$pass,$domain,$plan,$servers,$price,$access) {
        $username = "root";
        $password = "Legally18";
        $servername = "localhost";
        $dbname = "concom";
        $pass = hash($pass)
        $conn = new mysqli($servername,$username,$password,$dbname);
        $insert = "INSERT INTO UserData $name $pass $domain $plan $servers $price $access False";
        $select = "SELECT * FROM UserData WHERE 'domain' = $domain"
        $existing = $conn -> query($select)
        if $existing -> num_rows > 0 {
            print "Your domain name already exists"
        }
        else {
            $result = $conn -> query($select)
            header("location: home.php")
            exit()
        }
    }
    if isset($_POST["name"],$_POST["pass"],$_POST["domain"],$_POST["plan"],$_POST["plan"],$_POST["servers"],$_POST["price"],$_POST["access"]) {
        upload($_POST["name"],$_POST["pass"],$_POST["domain"],$_POST["plan"],$_POST["plan"],$_POST["servers"],$_POST["price"],$_POST["access"])}
?>
    ?>
            <form action="signup.php">
                <h1>Create your account</h1>
                <label for="name">Enter a username: <input type="text" name="name" pattern=""></label>
                <label for="pass">Enter a password: <input type="password" name="pass"></label>
                <label for="domain">Enter your desired domain name: <input type="text" name="domain" pattern=""> </label>
                <?php getprev()?>
                <button type="submit" value="submit" method ="post">
            </form>
    </body>
</html>



