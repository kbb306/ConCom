<php? 
    function upload($name,$pass,$domain,$plan,$servers,$price,$access) {
        $username = "root";
        $password = "Legally18";
        $servername = "localhost";
        $dbname = "concom";
        $conn = new mysqli($servername,$username,$password,$dbname);
        $sql = "INSERT INTO UserData $name $pass $domain $plan $servers $price $access True";
    }
    
    function getprev() {
            foreach($_POST, $key => value)
        }
?>
