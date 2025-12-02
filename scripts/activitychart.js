function generateNumberRange(start, end, step = 1) {
  let numbers = [];
  for (let i = start; i <= end; i += step) {
    numbers.push(i);
  }
  return numbers;
}

function chartCore(price,plan,servers) {
    
    plans = {"household":100,"business":1000,"global":100000}
    housepeople = {"low":4,"medium":10,"high":19}
    corppeople = {"low":50,"medium":70,"high":100}
    globalpeople = {"low":1000,"medium":50000,"high":100000}
    bridge = {"household":housepeople,"business":corppeople,"global":globalpeople}
    base = plans[plan]
    opts = bridge[plan]
    ratio = price/base
    let key
    if (ratio < 0.5) {
    key = "low";}
    else if (ratio < 0.8) {
    key = "medium";}
    else {
    key = "high";}
    people = opts[key]
    perserver = Math.floor(people/servers)
    ratio = perserver/1000
    maxpercent = Math.min(ratio*100,100)
    labels = []
    data = []
    nums = generateNumberRange(1,servers)
    for (i of nums) {
        labels.push("Server "+i)
        data.push(Math.floor(Math.random()*maxpercent))
    }
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
    nope = document.getElementById("nope")
    context = nope.getContext("2d")
    context.font = "120px Arial"
    context.fillStyle = "Blue"
    context.rect(0,0,500,150)
    context.stroke()
    context.fillText("Unable to access server load through DNS records",300,75)




