var prev = window.location.search
var plan = new URLSearchParams(prev)
planmenu = document.getElementById("plans")
planmenu.setAttribute("value",plan)
function rangeControl(caller){
    houseoptions = [["1-4",.33],["4-10",.66],["More than 10",1],["Prefer not to say",1]]
    corpoptions = [["20-50",.33],["50-70",.66],["More than 70",1],["Prefer not to say",1]]
    globaloptions = [["1000 or less",.33],["10000-50000",.66],["More than 50000",1],["Prefer not to say",1]]
    if (planmenu.value == "house") {
        var options = houseoptions
    }
    else if (planmenu.value == "company") {
         options = corpoptions
    }
    else if (planmenu.value == "global") {
        options = globaloptions
    }
    var i = 0
    for (thing in caller) {
        if (thing.type == "input") {
            thing.labels[0].innerHTML = options[i][0]
            thing.setAttribute("value", options[i][1])
            i++
        }

    }
}