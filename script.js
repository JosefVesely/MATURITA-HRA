
function unfade(element) {
    var op = 0.1;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 10);
}

function ukaz_napovedu() {
    // const date_show = new Date("January 11, 2025 23:00:00"); // ZMENIT!!!!!!!
    const date_show = new Date("December 27, 2024 23:00:00");

    const date_now = new Date();
    let time_show = date_show.getTime();
    let time_now = date_now.getTime();

    // Ukaz odpocet

    if (time_now <= time_show) {
        let rozdil = time_show - time_now;
        let h = Math.floor((rozdil % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let m = Math.floor((rozdil % (1000 * 60 * 60)) / (1000 * 60));
        let s = Math.floor((rozdil % (1000 * 60)) / 1000);

        let text = "Nápověda se zobrazí za ";

        if (h != 0) text += h + "h ";
        if (m != 0) text += m + "m ";
        text += s + "s";
        document.getElementById("napoveda").textContent = text;
    }
    else {
        // Ukaz napovedu ve 23:00

        let napoveda = "Pod světlem je největší tma. Tajenka se skládá z nejtučnějších písmen v předpise.<br>&nbsp;Ale pozor, je nutné jednotlivá písmena po nalezení ještě poskládat ve správném pořadí.";

        document.getElementById("napoveda").innerHTML = napoveda;
    }
    setTimeout(ukaz_napovedu, 1000);
}

function submit() {
    let tajenka = "bachar";
    const CASE_SENSITIVE = false;

    let input = document.getElementById("vstup").value;
    if (!CASE_SENSITIVE)
        input = input.toLowerCase();

    input = input.trim() // Zbav se zbytecnych mezer
    input = input.normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Zbav se diakritiky

    info = document.getElementById("info")
    image = document.getElementById("obrazek")

    if (input == tajenka) {
        // spravne
        image.style.display = "block";
        unfade(image);

        info.style.display = "block";
        info.innerHTML = "Správně!";
        info.style.color = "green";
        info.style.borderColor = "green";
        info.style.backgroundColor = "lightgreen";

        unfade(info);
    } else {
        // spatne
        image.style.display = "none";
        info.style.display = "block";
        info.innerHTML = "Tohle není správná odpověď<br>Zkus to znovu";
        info.style.color = "red";
        info.style.borderColor = "red";
        info.style.backgroundColor = "#fadbd8";

        unfade(info);
    }
}