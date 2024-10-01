function addEntry() {
    var entrys = document.getElementById("entry_container");
    var prompt = document.getElementById("prompt");
    var is_float = false
    if (!(/^\d*[.,]?\d*\s[A-Za-z]*$/.test(prompt.value))) {return;}
    else if (prompt.value.search(/[.,]/) >= 0) {is_float = true;}

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

    var newHTML = ""
    newHTML += '<div class="entry"> <span>';
    newHTML += prompt.value;
    newHTML += '</span> <span>';
    newHTML += prompt.value;
    newHTML += '</span> </div>';

    entrys.innerHTML += newHTML;
}