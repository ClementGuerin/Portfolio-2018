<html>
<head>
    <meta charset="UTF-8">
    <title>Wowowowowo</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="assets/css/reset.css">
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    
    
    <div class="project-list homepage show-homepage">
    </div>
    
    <div class="counter-projects homepage show-homepage">
        <p class="counter">
            <span class="current-project"></span> <span class="separation"></span> <span class="total-project"></span>
        </p>
    </div>
    
    <div class="follow-btn follow-btn-menu">
        <div class="btn-menu btn-on" onclick="startMenu();">
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div class="btn-close btn-off" onclick="closeMenu();" style="display: none">
            <span></span>
            <span></span>
        </div>
    </div>
    
    <section class="page">
        <div class="page-about">
            <h1>About</h1>
            <p>I'm Clément Guérin, a young web developer of 19, I have been doing web development for 5 years as an autodidact and I am currently in first year at Hétic.</p>
            <p>Interested by Front-End development I want to gain knowledge and experience, I seek an internship in this environment.</p>
            <p>Feel free to contact me if you are interested.</p>
            <ul class="socials">
                <li><a href="https://www.linkedin.com/in/cl%C3%A9ment-gu%C3%A9rin-68a690152/" target="_blank">LinkedIn</a></li>
                <li><a href="https://codepen.io/orphevs27/" target="_blank">CodePen</a></li>
                <li><a href="https://twitter.com/Orphevs" target="_blank">Twitter</a></li>
            </ul>
        </div>
        <div class="page-contact">
           <h1>Contact</h1>
            <?php
            if(isset($_POST['submit'])){
                $to = "clementguerin2700@gmail.com"; // this is your Email address
                $from = $_POST['email']; // this is the sender's Email address
                $name = $_POST['name'];
                $subject = "Message de " . $name;
                $subject2 = "Message envoyé à Clément Guérin";
                $message = $name . " vous a écrit : " . "\n\n" . $_POST['message'];
                $message2 = "Voici une copie de votre message " . $name . "\n\n" . $_POST['message'];

                $headers = "De : " . $from;
                $headers2 = "De : " . $to;
                mail($to,$subject,$message,$headers);
                mail($from,$subject2,$message2,$headers2); // sends a copy of the message to the sender
            }
            ?>
            
            <form action="" method="post">
                <input type="text" name="name" placeholder="Name..."><br>
                <input type="text" name="email" placeholder="Email..."><br>
                <textarea rows="5" name="message" cols="30" placeholder="Message..."></textarea><br>
                <input class="submit" type="submit" name="submit" value="Send this message">
            </form>
        </div>
    </section>
    
    <section class="menu">
       
        <div class="menu-list hide">
            <ul>
                <li><a href="#" id="home">Home</a></li>
                <li><a href="#" id="about">About</a></li>
                <li><a href="#" id="contact">Contact</a></li>
            </ul>
        </div>
       
        <div class="menu-layer-2 menu-open"></div>
        <div class="menu-layer-1 menu-open"></div>
    </section>
    
    <script src="assets/js/data.js"></script>
    <script src="assets/js/script.js"></script>
</body>
</html>