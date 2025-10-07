var prev = window.location.search
var prevdata = new URLSearchParams(prev)
plan = prevdata.get("plan")
console.log(plan)
planmenu = document.getElementById("plans")
planmenu.value = String(plan)



function rangeControl(){
    houseoptions = [["1-4",.33],["4-10",.66],["More than 10",1],["Prefer not to say",1]]
    corpoptions = [["20-50",.33],["50-70",.66],["More than 70",1],["Prefer not to say",1]]
    globaloptions = [["1000 or less",.33],["10000-50000",.66],["More than 50000",1],["Prefer not to say",1]]
    var options = []
    peoplerange = document.getElementById("peoplerange")
    console.log("Function called")
    peoplerange.innerHTML = "<p>How many people on your team?</p>"
    if (planmenu.value == "household") {
        options = houseoptions
    }
    else if (planmenu.value == "business") {
         options = corpoptions
    }
    else if (planmenu.value == "global") {
        options = globaloptions
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

    
