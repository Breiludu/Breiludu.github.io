(() => {
    window.addEventListener('keydown', key => {
        let curr_row = document.getElementById("r1");
        let char;
        switch (key.key) {
            case "Enter":
                char = '\n';
                break;
            case "Shift":
                char = '';
                break;
            default:
                char = key.key;
                break;
        }
        curr_row.innerHTML += char;
    });
})();