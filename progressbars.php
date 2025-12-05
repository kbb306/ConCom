<script src="https://cdn.jsdelivr.net/npm/progressbar.js"></script>
<script src="scripts/downloadbar.js"></script>
<script src="scripts/deletebar.js"></script>
<div id="filestealer">
    <h2>Server Harvesting</h2>
    <div id="filebar"></div>
    <p id="status-text"></p>
    <p id="packets"></p>
    <p id="files"></p>
    <script>
    fileInator(<?php echo json_encode($domains); ?>);
    </script>
</div>
<div id="evidencewiper">
    <h2>Company Purge Progress</h2>
    <div id="evidencebar"></div>
    <p id="evidence-status"></p>
    <p id="amount-wiped"></p>
    <p id="files-deleted"></p>
    <script>setTimeout(() => deleteInator(), 500 + Math.random()*2000);</script>
</div>
