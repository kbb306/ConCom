var prev = window.location.search
var prevdata = new URLSearchParams(prev)
selection = prevdata.get("plan")
price = 0
access = "None"
servers = 0
planmenu = document.getElementById("plans")
planmenu.value = selection
datamine = [["plan",selection],["multiplier",0],["access",access],["servers",servers],["price",price]]
rangeControl(selection)


function rangeControl(plan){
    houseoptions = [["1-4",.33,4],["4-10",.66,10],["More than 10",1,19],["Prefer not to say",1,19]]
    corpoptions = [["20-50",.33,50],["50-70",.66,70],["More than 70",1,100],["Prefer not to say",1,100]]
    globaloptions = [["1000 or less",.33,1000],["10000-50000",.66,50000],["More than 50000",1,10000],["Prefer not to say",1,10000]]
    options = []
    peoplerange = document.getElementById("peoplerange")

    console.log("Function called")
    console.log("Selected Option: "+ plan)

    peoplerange.innerHTML = "<p>How many people on your team?</p>"

    if (plan == "household") {
        options = houseoptions
        price = 100
        
    }
    else if (plan == "business") {
         options = corpoptions
         price = 1000
         
    }
    else if (plan == "global") {
        options = globaloptions
        price = 100000
        
    }

    else {
        options = []
    }
    
    console.log("Array set!")
    console.log(options)
    newform = []
    for (item of options) {
         var thing = document.createElement("input")
         var thinglabel = document.createElement("label")
         thing.setAttribute("name","teamsize")
         thing.setAttribute("type","radio")
         thing.setAttribute("id",options.indexOf(item))
         thing.setAttribute("value",item[1])
         thinglabel.setAttribute("for",thing.id)
         thing.setAttribute("onchange","tally()")
         thinglabel.textContent = (item[0] + " ")
         peoplerange.append(thing)
         peoplerange.append(thinglabel)  
        }
        consolidate(datamine)
        
    }
function tally() {
    console.clear()
    multipliers = Array.from(document.getElementsByName("teamsize"))
    plan = document.getElementById("plans").value
    console.log("Checking which size option is checked")
    for (var item of multipliers) {
        if (item.checked) {
            discount = item.value
            which = multipliers.indexOf(item)           
        }
    }
    console.log("Size option " + which + " is checked")

    hardware = Array.from(document.getElementsByName("hardware"))
    console.log("Checking which DNS option is checked")
    for (radio of hardware) {
        if (radio.id == "rent" && radio.checked) {
            console.log(radio.id+" is checked!")
            access = "Server"
            maxusers = options[which][2]
            console.log(maxusers)
            servers = Math.floor(maxusers / 1000)
            if (servers == 0) {
                servers = 1
            }
            
        }
        else if (radio.id == "manual" && radio.checked) {
            console.log(radio.id+" is checked!")
            access = "DNS"
        }
        else if (radio.id == "manual" && radio.checked){
            console.log(radio.id+" is checked!")
            access = "Rootkit"
        }
    }
    datamine = [["plan",plan],["multiplier",discount],["access",access],["servers",servers],["price",price]]
    consolidate(datamine) 
}



function consolidate(datamine) {
    console.clear()
    console.log("Current values are " + datamine)
    lastform = document.getElementById("billing") // For later adding to account info in database?
    Names = []
    hiddeninfo = Array.from(lastform.querySelectorAll('input[type=hidden]'))
    hiddeninfo.forEach(element => {
        Names.push(element.name)
    });
   // console.log(Names)
    for (nugget of datamine) {
        console.log( "Searching for hidden "+ nugget[0]+" entry")
        i = Names.indexOf(nugget[0])
        if (i >= 0) {
            console.log(nugget[0]+" found: " +hiddeninfo[i].value+". Changing to "+nugget[1])
            hiddeninfo[i].value = nugget[1]
        }
        else {
            console.log(nugget[0]+" entry not found! Creating...")
            entry = document.createElement("input")
            entry.setAttribute("type","hidden")
            entry.setAttribute("name",nugget[0])
            entry.setAttribute("value",nugget[1])
            lastform.append(entry)
        }
    }
        if (datamine[1][1] != 0){
        updateCanvas(datamine)
    }
    //console.log(datamine)

}


function check(caller) {
   form = Array.from(caller.elements) 
   var OK = false
   for (var entry of form) {
        if (entry.type == "label") {
            entry = entry.firstElementChild
        }

        if (entry.type == "text") {
            result = entry.value.search(RegExp(entry.title))
            if (result == -1) {
                alert("Invalid input at: " + String(entry.parentELement.innerHTML).split("<")[0])
                OK = false
            }
            else {
                OK = true
            }
        }
        else if (entry.type == "hidden") {
            var already = false
            if (!entry.value) {
                    OK = false
                    if (!already) {
                    alert("Double check first two forms!")
                    }
                    already = true
                }
                else {
                    OK = true
                }
            }
        }
        return OK
   }

canvas = document.getElementById("total")
context = canvas.getContext("2d")
context.font = "20px Arial"
context.fillStyle = "Blue"
context.rect(0,0,500,150)
context.stroke()
context.fillText("Your Total:",10,30)

function updateCanvas(datamine) {
    context.clearRect(0,0,canvas.width,canvas.height)
    context.fillStyle = "Blue"
    context.font = "20px Arial"
    context.fillText("Your Total:",10,30)
    
    context.font = "15px Arial"
    context.fillStyle = "Black"
    var base = datamine[4][1]
    var price = base
    context.fillText((" "+"Selected Plan: "+"$"+base),15,50)
    context.fillText(("  "+" ⨉ Usage Multiplier: "+datamine[1][1]),15,65)
    price *=datamine[1][1]
    totalY = 80
    if (datamine[2][1] == "DNS") {
        context.fillText(("+ DNS Fee: $10"),15,totalY)
        price+=10
        totalY += 15
    }
    else if (datamine[2][1] == "Server") {
        context.fillText(("+ $15 per server X "+ datamine[3][1]+" Servers: "+"$"+(15*datamine[3][1])),15,totalY)
        price+=(15*datamine[3][1])
        totalY += 15
    }

    else if (datamine[2][1] == "Rootkit") {
        
    }
    
    context.beginPath()
    context.moveTo(0,totalY)
    context.lineTo(225,totalY)
    context.stroke()
    totalY+=15
    context.fillText(("Total Price: "+"$"+price),15,totalY)
    }
