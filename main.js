var total = {

}

function addEntry() {
    var entrys = document.getElementById("entry_container");
    var prompt = document.getElementById("prompt");
    if (!(/^\d*[.,]?\d*\s[A-Za-z]*$/.test(prompt.value))) {return;}

    var dec = "";
    var float = "";
    var readingFloat = false;
    var people = "";
    prompt.value.split('').forEach(char => {
        if ((/^\d$/).test(char)) {
            if (readingFloat) {float += char;}
            else {dec += char;}
        } else if ((/^[.,]$/).test(char)) {
            readingFloat = true;
        } else if ((/^[A-Za-z]$/).test(char)) {
            people += char;
        }
    });

    if (float === "") {float = "00";}
    else if (float.length === 1) {float = float + "0";}
    else if (float.length > 2) {float = float.slice(0, 2);}

    var divided = parseFloat(dec + '.' + float) / people.length
    people.split('').forEach(char => {
        if (total["char"] === undefined) {total["char"] = divided}
        else {total["char"] += divided}
    });

    var newHTML = ""
    newHTML += '<div class="entry"> <span>';
    newHTML += dec + '.' + float + ' ' + people;
    newHTML += '</span> <span>';
    newHTML += divided.toFixed(2) + " pers.";
    newHTML += '</span> </div>';
    entrys.innerHTML += newHTML;
}