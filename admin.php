<html>
    <head>
        <title>

        </title>
        <link rel="stylesheet" src="css/styles.css">
    </head>
    <body>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <script src="scripts/adminchart.js"></script>
        <?php 
            function getPeople($price,$plan) {
                $plans = ["household"=>100,"business"=>1000,"global"=>100000];
                $housepeople = ["low"=>4,"medium"=>10,"high"=>19];
                $corppeople = ["low"=>50,"medium"=>70,"high"=>100];
                $globalpeople = ["low"=>1000,"medium"=>50000,"high"=>100000];
                $bridge = ["household"=>$housepeople,"business"=>$corppeople,"global"=>$globalpeople];
                $base = $plans[$plan];
                $opts = $bridge[$plan];
                $ratio = $price/$base;
                $key = "none";
                if ($ratio < 0.5) {
                $key = "low";}
                else if ($ratio < 0.8) {
                $key = "medium";}
                else {
                $key = "high";}
                $people = $opts[$key];
                return $people;
            }




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
                print "<div style=" ."height=> 200px; overflow-y=> auto;".">
                            <table>";
                print "         <tr>";
                while ($fieldinfo = $result -> fetch_field()) {
                    print "         <th>" .$fieldinfo->name. "</th>";
                }   
                    print "         <th>People Using</th>";
                    print "     </tr>";
                while ($row = $result -> fetch_assoc()) {
                    print "     <tr>";
                    foreach($row as $value) {
                        print "     <td>". $value . "</td>";
                    }
                    print "         <td>". getPeople($row["price"],$row["plan"]) ."</td>";
                    print "     </tr>";
                }        
                print "     </table>
                       </div>";
            }
            $sql = "SELECT price, plan FROM userdata";
            $price_plan = $conn -> query($sql);
            $total = 0;
            $servers = 0;
            $price = 0;
            while ($thing = $price_plan -> fetch_assoc()) {
                $total += getPeople($thing["price"],$thing["plan"]);
                $servers += $thing["servers"];
                $price += $thing["price"];
            }
            print "<div id=serverload>
                    <h2>Total Server Load</h2>
                    <canvas id='Activity' height='150' width='500'>
                        Your browser does not support the canvas element
                    </canvas>; 
                    <script>chartCore($total,$servers)</script>
                   </div>";

                
            
        ?>
    </body>
</html>