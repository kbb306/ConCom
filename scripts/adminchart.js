function chartCore(people,servers) {
    perserver = people/servers
    maxpercent = Math.min(perserver*500000,100)
    labels = []
    data = []
    
    
    labels.push("Total Server Load (%) ")
    data.push(Math.floor(Math.random()*maxpercent))
    
    const chartdata  = {
        labels: labels,
        datasets: [{
            label: 'Server load (%)',
            data: data,
            backgroundColor: [
                    'rgba(54, 162, 235, 0.6)',
                    
                ],
            borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                  borderWidth: 1
            }]
        };
        
        const config = {
            type: 'bar',
            data: chartdata,
            options: {
                indexAxis: 'y', 
                responsive: true,
                animation: {
                    duration: 1000
                },
                scales: {
                    x: { 
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        };
        const ServerChart = new Chart(
            document.getElementById("Activity"),
            config
        )

        function updateColors() {
            const dataset = ServerChart.data.datasets[0];
            dataset.backgroundColor = dataset.data.map(v => {
                if (v >= 90)   return 'rgba(255, 99, 132, 0.6)';   // red for high load
                if (v >= 70)   return 'rgba(255, 206, 86, 0.6)';   // yellow for medium
                if (v >= 50)   return 'rgba(54, 162, 235, 0.6)';

                return 'rgba(75, 192, 192, 0.6)';                  // green for low
            });
        }

        function randomize() {
            const datarr = ServerChart.data.datasets[0].data;
            for (i in datarr) {
                datarr[i] = Math.floor(Math.random()*maxpercent)
            }
            updateColors()
            ServerChart.update()
        }
        setInterval(randomize,2000)
    }