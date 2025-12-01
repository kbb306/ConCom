function generateNumberRange(start, end, step = 1) {
  let numbers = [];
  for (let i = start; i < end; i += step) {
    numbers.push(i);
  }
  return numbers;
}

function chartCore(price,plan,servers) {
    plans = {"household":100,"business":1000,"global":1000000}
    housepeople = {0.33:4,0.66:10,1:19}
    corppeople = {0.33:50,0.66:70,1:100}
    globalpeople = {0.33:1000,0.66:50000,1:100000}
    bridge = {"household":housepeople,"business":corppeople,"global":globalpeople}
    base = plans[plan]
    opts = bridge[plan]
    key = price/base
    people = opts[key]
    perserver = Math.floor(people/servers)
    labels = []
    data = []
    nums = generateNumberRange(1,servers)
    for (i of nums) {
        labels.push("Server "+i)
        data.push(Math.floor(Math.random()*perserver))
    }
    const chartdata  = {
        labels: labels,
        datasets: [{
            label: 'Server load (%)',
            data: data,
            backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)'
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
        function randomize() {
            const datarr = ServerChart.data.datasets[0].data;
            for (i in datarr) {
                datarr[i] = Math.floor(Math.random()*perserver)
                ServerChart.update()
            }
        }
        setInterval(randomize,2000)
    }




