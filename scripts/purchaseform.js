var prev = window.location.search
var prevdata = new URLSearchParams(prev)
plan = prevdata.get("plan")
console.log(plan)
planmenu = document.getElementById("plans")
planmenu.value = String(plan)
price = 0
access = "None"
servers = 0

function rangeControl(){
    houseoptions = [["1-4",.33,4],["4-10",.66,10],["More than 10",1,19],["Prefer not to say",1,19]]
    corpoptions = [["20-50",.33,50],["50-70",.66,70],["More than 70",1,100],["Prefer not to say",1,100]]
    globaloptions = [["1000 or less",.33,1000],["10000-50000",.66,50000],["More than 50000",1,10000],["Prefer not to say",1,10000]]
    options = []
    peoplerange = document.getElementById("peoplerange")
    planmenu = document.getElementById("planmenu")
    console.log("Function called")
    console.log("Selected Option: "+ planmenu.value)
    peoplerange.innerHTML = "<p>How many people on your team?</p>"
    if (planmenu.value == "household") {
        options = houseoptions
        price = 100
        
    }
    else if (planmenu.value == "business") {
         options = corpoptions
         price = 1000
         
    }
    else if (planmenu.value == "global") {
        options = globaloptions
        price = 100000
        
    }
    
    console.log("Array set!")
    console.log(options)
    newform = []
    for (var i = 0; i< options.length; i++) {
         var thing = document.createElement("input")
         var thinglabel = document.createElement("label")
         thing.setAttribute("name","teamsize")
         thing.setAttribute("type","radio")
         thing.setAttribute("id",i)
         thing.setAttribute("value",options[i][1])
         thinglabel.setAttribute("for",i)
         thinglabel.textContent = (options[i][0] + " ")
         peoplerange.append(thing)
         peoplerange.append(thinglabel)  
        }
    }
function tally() {
    multipliers = document.getElementsByName("teamsize")

    for (var i = 0; i < multipliers.length; i++) {
        if (multipliers[i].checked) {
            discount = multipliers[i].value
            price *= discount
            which = i
        }
    }
    hardware = document.getElementsByName("hardware")
    for (var radio = 0; radio < hardware.length; radio++) {
        if (radio[i].id == "rent" && radio[i].checked) {
            maxusers = options[which][3]
            servers = maxusers % 1000
            var extra = 15 * (servers)
            price += extra
            access = "Server"
        }
        else if (radio.id == "manual" && radio[i].checked) {
            var DNSfee = 10
            price += DNSfee
            access = "DNS"
        }
        else {
            access = "Rootkit"
        }
    }
}

lastform = document.getElementById("billing") // For later adding to account info in database?
datamine = [["plan",planmenu.value],["access",access],["servers",servers],["price",price]]
for (var i = 0;i < datamine.length; i++) {
    nugget = datamine[i]
    entry = document.createElement("input") 
    entry.setAttribute("type","hidden")
    entry.setAttribute("name",nugget[0])
    entry.setAttribute("id",nugget[0])
    entry.setAttribute("value",nugget[1])
    lastform.append(entry)
}

    
