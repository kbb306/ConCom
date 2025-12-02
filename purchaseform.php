<!DOCTYPE html>
<html lang="eng">
    <head>
        <title>Calculate Pricing</title>
        <link rel="stylesheet" href="css/styles.css">
        <meta charset = "utf-8">
    </head>
    <body>
        <?php include("nav.html")?>
        <form id="planform">
            <label>Select a plan:</label>
            <select name="plans" id="plans" onchange="rangeControl(this.value)">
                <option value="nothing">Select a plan</option>
                <option value="household">Houshold</option>
                <option value="business">Business</option>
                <option value="global">Global</option>
            </select>
        </form>
        <br>
            <form id="peoplerange">
                <p>How many people on your team?</p>
                
        </form>
            <br>
        <form id="serveroptions">
            <p>Would you like to:</p>
            <input type="radio" name="hardware" id="rent" onchange="tally()">
            <label for="rent">Rent a ConCom server (Extra $15 per server used) </label>
            <br>
            <input type="radio" name="hardware" id="auto" onchange="tally()">
            <label for="auto">Use ConCom's autoDNS software on your own hardware (You will be provided download link and instructions after purchase)</label>
            <br>
            <input type="radio" name="hardware" id="manual" onchange="tally()"></label>
            <label for="manual">Set up DNS manually (incurs third party processing fee)</label> 
        </form>
        <form id="billing"  method ="post" onsubmit="return validate()" action="signup.php">
            <br>
            <br>
            <canvas id="total" height="150" width="500">
                Your browser does not support the canvas element.
            </canvas>
            <br>
            <p>Please enter billing information:</p>
            <br>
            <label>First Name:&nbsp; <input type="text" id="fname" name ="fname"title="\s*\S+\s*"></label>
            <br>
            <label>Last Name:&nbsp; <input type="text" id="lname" name="lname" title="\s*\S+\s*"></label>
            <br>
            <label>Billing Address:&nbsp; <input type="text" id="address" name="address" title=""></label>
            <br>
            <label>Zip Code:&nbsp; <input type="text" id="zip" name="zip" title="\d\d\d\d\d"></label>
            <br>
            <label>Email:&nbsp; <input type="email" id="email" name="email"></label>
            <br>
            <label>Phone:&nbsp; <input type="tel" id="phone" name="phone"></label>
            <button type="submit" id="submit">Submit</button>
        </form>
       
        <script src="scripts/purchaseform.js"></script>
    </body>
</html>