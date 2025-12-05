<!DOCTYPE html>
<html lang="eng">
<head>
    <title>Purchase Options</title>
    <link rel="stylesheet" href="css/styles.css">
        <meta charset = "utf-8">
</head>
<body> 
<?php include("nav.html");?>
    <form action="purchaseform.php">
        <div class="plan-grid">
            <div id="Household" class="plan">
                <h2>Household</h2>
                <figure>
                <img src="images/ConCom_house.jpg" width="75%">
                <figcaption>For households and small scale clubs</figcaption>
                </figure>
                <a href="purchaseform.php?plan=household">Choose</a>
            </div>

            <div id="Business" class="plan">
                <h2>Business</h2>
                <figure>
                <img src="images/ConCom_Office.jpg" width="75%">
                <figcaption>For businesses and non-profits</figcaption>
                </figure>
                <a href="purchaseform.php?plan=business">Choose</a>
            </div>

            <div id="Global" class="plan">
                <h2>Global</h2>
                <figure>
                <img src="images/ConCom_Earth.jpg" width="75%">
                <figcaption>For multinational organizations</figcaption>
                </figure>
                <a href="purchaseform.php?plan=global">Choose</a>
            </div>
        </div>
    </form>
    <span class="disclaimer">In addition to the prices listed on the submenus, ConCom reserves the right to use spare processing power and storage on all connected client systems.</span>
</body>
</html>