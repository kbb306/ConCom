<!DOCTYPE html>
<html>
    <head>
        <title>
            Create your account
        </title>
    </head>
    <body>
        <?php 
            function getprev() {
                foreach($_POST, $key => $value) {
                    print "<input type='hidden' name='$key' value='$value'>"
                }
            }
?>
            <form action="createaccount.php">
                <h1>Create your account</h1>
                <label for="name">Enter a username: <input type="text" name="name" pattern=""></label>
                <label for="pass">Enter a password: <input type="password" name="pass"></label>
                <label for="domain">Enter your desired domain name: <input type="text" name="domain" pattern=""> </label>
                <?php getprev()?>
                <button type="submit" value="submit" method ="post">
            </form>
    </body>
</html>



