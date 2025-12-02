function fileInator(dyndomains) {
    const statusText = document.getElementById('status-text');
    const filesToProcess = 1000;
    let filesCompleted = 0;
    let totalFilesSize = 0;
    let processedSize = 0;
    let totalFiles = 42;  // start from 42 and increment globally

    const packetsEl = document.getElementById('packets');
    const filesEl   = document.getElementById('files');

    // Initialize the ProgressBar.js bar
    var bar = new ProgressBar.Line('#filebar', {
        strokeWidth: 1,
        easing: 'easeInOut',
        duration: 500,
        color: '#007bff',
        trailColor: '#eee',
        trailWidth: 1,
        text: {
            value: '0%',
            style: {
                color: '#000',
                position: 'absolute',
                right: '0',
                top: '30px',
                padding: 0,
                margin: 0,
                transform: null
            },
            autoStyleContainer: false
        }
    });

    function startSimulation() {
        const fileSizes = [];
        const prefixes = [
            "marysbakingco","facelessmegacorp","randomacademy",
            "deleteheads2004","ARC","willowhillpsych",
            "randomcitygeneralhospital","OKDonuts","monstersincorporated"
        ].concat(dyndomains);

        const smallFiles = [
            "Employees.db","passwords.kdbx","accounts.dat","users.sql",
            "index.html","purchase_records.sql","secret_recipes.txt",
            "manifesto.html","namgyubirthdaydontsharesubongiswear.jpg",
            "donuts_staff_hbo_max_password_dont_share.txt",
            "MM_rev_engin_blueprints.pdf",
        ];
        const medFiles = [
            "Employees.db","passwords.kdbx","accounts.dat","users.sql",
            "project_source.zip","purchase_records.sql","ceomail.mbox",
            "PSYCHREPORT_LOTTIEMATTHEWS_RMC017283948361.aiff",
            "Recording_Atrium_6/10/??.mp3",
            "INTERVIEW_LAURELGATES_12012022.mp3",
            "company_archive.zip"
        ];
        const largeFiles = [
            "andromeda_src.zip","CalendarReminder.exe",
            "Morganfreeman_voicedata.zip","M57383.bin",
            "evilgeniusexperimentdatabase61604_new_new(FINAL)[1].ugaf",
            "sigourney.bnlrbf","fionabackup2021new.rai"
        ];
        const YOWZA = [
            "00004/[F]AS[IV]IDPC241105/AS[I]_backup.apaf",
            "00001/[F]AS[I]SAPC241105/AS[I]_backup.apaf",
            "00002/[F]AS[II]IRPC241105/AS[I]_backup.apaf",
            "00003/[F]AS[III]IDFKPC241105/AS[I]_backup.apaf",
            "studentinfo.sdb","multiverse_directory.zip",
            "master_artifact_list.xml",
        ];

        const fileNames = [];
        for (let i = 0; i < filesToProcess; i++) {
            const size = Math.floor(Math.random() * 59000) + 1; // 1..59000
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
            const randomIncrement = (Math.random() * 0.10) + 0.05;
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
            statusText.textContent = `Downloading File ${currentFile}`;

            const packetsNow = Math.floor((currentTotalProcessed * 1024) / 1500);
            packetsEl.textContent = `${packetsNow.toLocaleString()} Packets Intercepted`;
            filesEl.textContent   = `${totalFiles} Files Reconstructed`;

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
        }, 150);
    }

    startSimulation();
}
