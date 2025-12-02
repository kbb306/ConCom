function deleteInator() {
    const statusText = document.getElementById('status-text');
    const filesToProcess = 1000;
    let filesCompleted = 0;
    let totalFilesSize = 0;
    let processedSize = 0;
    let totalFiles = 16;  // start from 16 and increment globally

    const deleteStatus = document.getElementById("evidence-status")
    const GB = document.getElementById('amount-wiped');
    const filesEl   = document.getElementById('files-deleted');

    // Initialize the ProgressBar.js bar
    var bar = new ProgressBar.Line('#evidencebar', {
        strokeWidth: 1,
        easing: 'easeInOut',
        duration: 500,
        color: '#ff0000ff',
        trailColor: '#eee',
        trailWidth: 1,
        text: {
            value: '0%',
            style: {
                color: '#000',
                transform: null
            },
            autoStyleContainer: false
        }
    });

    function startSimulation() {
        const fileSizes = [];
        const prefixes = [
            "ftp","offsite","offsite2",
            "mirror","root","data",
            "abcdgh","admin","dev",
            "old","archive","backup"
        ];

        const smallFiles = [
            "Employees.db","passwords.kdbx","accounts.dat","users.sql",
            "index.html","purchase_records.sql","secret_recipes.txt",
            "manifesto.docx","shellcompanies.xslx","saudis.checkbook","founder_last_will.pdf",
            "client_data_breach_logs.txt",
            "prototype_drone_specs.pdf","secret_operations_memo.docx","chem_lab_results_2024.7z",
            "hr_termination_reports.csv","milestone_report_Q3_final.pptx","arcane_projects_overview.pdf",
            "server_access_keys_private.pem","encrypted_chat_logs.enc","marketing_strategy_2025_final.pptx",
            "employee_surveillance_records.dat","satellite_imagery_raw.geo","archive_room_inventory.json",
            "vault_system_map.svg"
        ];
        const medFiles = [
            "Employees.db","passwords.kdbx","accounts.dat","users.sql",
            "project_source.zip","purchase_records.sql","ceomail.mbox",
            "safehouse_locations.gpx","research_locations.gpx",
        ];
        const largeFiles = [
           "genetics_division_archives.zip","antimemetics.zip","cyber_operations.zip",
           "weaponR&D.7z","competitor_intelligence.tar",""
        ];
        const YOWZA = [
           "deepwell_drive_1.img","deepwell_drive_2.img","deepwell_drive_3.img",
           "deepwell_master.catalog","deepwell_redundant.catalog"
        ];

        const fileNames = [];
        for (let i = 0; i < filesToProcess; i++) {
            const size = Math.floor(Math.random() * 500000) + 1; // 1..500000
            let names;

            switch (true) {
                case (size <= 500):
                    names = smallFiles;
                    break;
                case (size <= 5000):
                    names = medFiles;
                    break;
                case (size <= 20000):
                    names = largeFiles;
                    break;
                default:
                    names = YOWZA;
                    break;
            }

            const randIndex  = Math.floor(Math.random() * names.length);
            const randName   = names[randIndex];
            const randPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];

            fileSizes.push(size);
            fileNames.push(randPrefix + ".concomcompany.com/.../" + randName);
            totalFilesSize += size;
        }

        processNextFile(0, fileSizes, fileNames, totalFilesSize);
    }

    function processNextFile(index, fileSizes, fileNames, totalSize) {
        if (index >= fileSizes.length) {
            // All files processed
            statusText.textContent = "Done";
            bar.animate(1.0);
            bar.setText('100%');

            const finalPackets = Math.floor((totalSize * 1024) / 1500);
            packetsEl.textContent = `${finalPackets.toLocaleString()} Packets Intercepted`;
            filesEl.textContent   = `${totalFiles} Files Reconstructed`;
            return;
        }

        const currentFile      = fileNames[index];
        const currentFileSize  = fileSizes[index];
        let currentFileProgress = 0;

        const fileInterval = setInterval(() => {
            // Random progress for this file (5–15%)
            const randomIncrement = (Math.random() * 0.07) + 0.03;
            currentFileProgress += randomIncrement;

            if (currentFileProgress >= 1.0) {
                currentFileProgress = 1.0;
            }

            // How much data we've processed in total *so far*,
            // using current partial progress of this file
            const currentTotalProcessed = processedSize + (currentFileProgress * currentFileSize);
            const overallPercent = currentTotalProcessed / totalSize;

            // Update progress bar
            bar.animate(overallPercent);
            bar.setText(Math.round(overallPercent * 100) + ' %');

            // Update text
            deleteStatus.textContent = `Destroying File ${currentFile}`;

            const deleted = (currentTotalProcessed/1024);
            GB.textContent = `${deleted.toLocaleString()} GB Wiped`;
            filesEl.textContent   = `${totalFiles} Files Deleted`;

            // If this file finished, lock it in and go to the next
            if (currentFileProgress >= 1.0) {
                clearInterval(fileInterval);

                processedSize += currentFileSize;
                totalFiles += 1;
                filesCompleted += 1;

                setTimeout(() => {
                    processNextFile(index + 1, fileSizes, fileNames, totalSize);
                }, 500);
            }
        }, 210);
    }

    startSimulation();
}
