let total = {

}

let entryIdCount = 0;

function addEntry() {
    let entrys = document.getElementById("entry_container");
    let prompt = document.getElementById("prompt");
    if (!(/^\d*[.,]?\d*\s?[A-Za-z]+$/.test(prompt.value))) {return;}

    let number = "";
    let people = "";
    prompt.value.split('').forEach(char => {
        if ((/^[A-Za-z]$/).test(char)) {
            people += char;
        } else if ((/^\d$/).test(char)) {
            number += char;
        } else if ((/^[\.,]$/).test(char)) {
            number += '.';
        }
    });

    let divided = Math.round((parseFloat(number) / people.length)*100)/100
    people.split('').forEach(char => {
        if (total[char] === undefined) {total[char] = divided}
        else {total[char] += divided}
    });

    let newHTML = ""
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
    let entry = document.getElementById("getEntry" + entryIdNumber);

    let entry_info = entry.getElementsByTagName("span");
    let divided = entry_info[1].innerHTML.split(" ")[0];
    let people = entry_info[0].innerHTML.split(" ")[1];

    people.split('').forEach(char => {
        total[char] -= divided
    });

    entry.remove();
    updateResults();
}

function updateResults() {
    let results = document.getElementById("results");
    let sum = document.getElementById("sum");

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
    sum.innerHTML = "<span>Total: " + sum_total.toFixed(2) + "</span>";
}

(() => {
    window.addEventListener("keydown", key => {
        if (key.key === "Enter") {addEntry();}
    });
})();
