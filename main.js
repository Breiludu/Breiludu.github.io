var total = {

}

var entryIdCount = 0;

function addEntry() {
    var entrys = document.getElementById("entry_container");
    var prompt = document.getElementById("prompt");
    if (!(/^\d*[.,]?\d*\s?[A-Za-z]+$/.test(prompt.value))) {return;}

    var number = "";
    var people = "";
    prompt.value.split('').forEach(char => {
        if ((/^[A-Za-z]$/).test(char)) {
            people += char;
        } else if ((/^\d$/).test(char) || (/^[.,]$/).test(char)) {
            number += char;
        }
    });

    var divided = parseFloat(number) / people.length
    people.split('').forEach(char => {
        if (total[char] === undefined) {total[char] = divided}
        else {total[char] += divided}
    });

    var newHTML = ""
    newHTML += '<div class="entry" id="getEntry' + entryIdCount + '"> <div class="entry_text"> <span>';
    newHTML += number + ' ' + people;
    newHTML += '</span> <span>';
    newHTML += divided.toFixed(2) + " pers.";
    newHTML += '</span> </div> <div class="button_container"> <button id="remove_button" onclick="removeEntry('+ entryIdCount +');"></button> </div> </div>';
    entrys.innerHTML = newHTML + entrys.innerHTML;

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
    var sum = document.getElementById("sum");

    let sum_total = 0;
    let newHTML = "";
    Object.keys(total).forEach(element => {
        if (total[element] > 0) {
            newHTML += '<div class="person"><span>';
            newHTML += element + ': ' + total[element].toFixed(2);
            newHTML += '</span></div>';

            sum_total += total[element];
        }
    });
    results.innerHTML = newHTML
    sum.innerHTML = "<span>Total: " + sum_total + "</span>";
}

(() => {
    window.addEventListener("keydown", key => {
        if (key.key === "Enter") {addEntry();}
    });
})();