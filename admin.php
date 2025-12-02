<html>
    <head>
        <title>

        </title>
        <link rel="stylesheet" src="css/styles.css">
    </head>
    <body>
        <?php 
            $cols = [];
            $username = "root";
            $password = "Legally18";
            $servername = "localhost";
            $dbname = "concom";
            $conn = new mysqli($servername,$username,$password,$dbname);
            $query = "SELECT * FROM userdata JOIN billingdata ON userdata.email = billingdata.email ";
            $result = $conn -> query($query);
            if ($result -> num_rows > 0) {
                print "<h2>User data</h2>";
                print "<div style=" ."height: 200px; overflow-y: auto;".">
                            <table>";
                print "         <tr>";
                while ($fieldinfo = $result -> fetch_field()) {
                    print "         <th>" .$fieldinfo->name. "</th>";
                    
                }   
                    print "     </tr>";
                while ($row = $result -> fetch_assoc()) {
                    print "     <tr>";
                    foreach($row as $value) {
                        print "     <td>". $value . "</td>";
                    }
                    print "     </tr>";
                }        
                print "     </table>
                       </div>";
            }
            
        ?>
    </body>
</html>