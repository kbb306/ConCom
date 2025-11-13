 <?php 
  function upload($name,$pass,$domain,$plan,$servers,$price,$access) {
        $username = "root";
        $password = "Legally18";
        $servername = "localhost";
        $dbname = "concom";
        $conn = new mysqli($servername,$username,$password,$dbname);
        $sql = "INSERT INTO UserData $name $pass $domain $plan $servers $price $access False";
    }
    upload($_POST["name"],$_POST["pass"],$_POST["domain"],$_POST["plan"],$_POST["plan"],$_POST["servers"],$_POST["price"],$_POST["access"])
?>