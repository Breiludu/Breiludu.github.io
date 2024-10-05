var total = {

}

var entryIdCount = 0;

function addEntry() {
    var entrys = document.getElementById("entry_container");
    var prompt = document.getElementById("prompt");
    if (!(/^\d*[.,]?\d*\s?[A-Za-z]*$/.test(prompt.value))) {return;}

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
        if (total[char] === undefined) {total[char] = divided}
        else {total[char] += divided}
    });

    var newHTML = ""
    newHTML += '<div class="entry" id="getEntry' + entryIdCount + '"> <div class="entry_text"> <span>';
    newHTML += dec + '.' + float + ' ' + people;
    newHTML += '</span> <span>';
    newHTML += divided.toFixed(2) + " pers.";
    newHTML += '</span> </div> <div class="button_container"> <button id="remove_button" onclick="removeEntry('+ entryIdCount +');"></button> </div>';
    entrys.innerHTML += newHTML;

    prompt.value = "";
    entryIdCount += 1;
    updateResults();
}

function removeEntry(entryIdNumber) {
    var entry = document.getElementById("getEntry" + entryIdNumber);

    let entry_info = entry.getElementsByTagName("span")[0].innerHTML.split(" ");
    let temp_value = entry_info[0];
    let temp_people = entry_info[1];

    let temp_divided = temp_value / temp_people.length
    temp_people.split('').forEach(char => {
        total[char] -= temp_divided
    });

    entry.remove();
    updateResults();
}

function updateResults() {
    var results = document.getElementById("results");
    let newHTML = "";
    Object.keys(total).forEach(element => {
        if (total[element] > 0) {
            newHTML += '<div class="person"><span>';
            newHTML += element + ': ' + total[element].toFixed(2);
            newHTML += '</span></div>';
        }
    });
    results.innerHTML = newHTML
}

(() => {
    window.addEventListener("keydown", key => {
        if (key.key === "Enter") {addEntry();}
    });
})();