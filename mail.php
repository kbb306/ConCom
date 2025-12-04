<!DOCTYPE html>
<html lang="en">
<head>
    <title>ConCom Webmail</title>
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/mail.css">
    <meta charset="utf-8">
   
</head>
<body>
<?php include("adminnav.html");?>
<main class="craigmail-container">
    <aside class="craigmail-sidebar">
        <h1>ConCom Webmail</h1>
        <ul class="craigmail-folders">
            <li class="craigmail-active-folder" data-folder="inbox">Inbox</li>
            <li data-folder="sent">Sent</li>
            <li data-folder="archive">Archive</li>
        </ul>

        <div class="craigmail-search">
            <input type="text" id="craigmail-search" placeholder="Search subject/body…">
        </div>
    </aside>

    <section class="craigmail-main">
        <div class="craigmail-list" id="craigmail-list">
            <p class="craigmail-empty">Loading inbox…</p>
        </div>

        <article class="craigmail-detail" id="craigmail-detail">
            <p class="craigmail-empty">Select a message from the left to read it.</p>
        </article>
    </section>
</main>

<script src="scripts/craigmail.js"></script>
</body>
</html>
