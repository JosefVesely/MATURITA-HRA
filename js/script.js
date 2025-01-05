// Jestli nebylo 10, presmeruj na jinou stranku
const date = new Date();

if (![21, 22, 23, 0, 1].includes(date.getHours())) { // ZMENIT!!!!
    window.location.replace("cekani.html");
}


function ukaz_napovedu(napoveda) {
    const date_show = new Date("January 11, 2025 23:00:00"); // ZMENIT!!!!!!!
    // const date_show = new Date("December 27, 2024 23:00:00");

    const date_now = new Date();
    let time_show = date_show.getTime();
    let time_now = date_now.getTime();

    // Ukaz odpocet

    if (time_now <= time_show) {
        let rozdil = time_show - time_now;
        let h = Math.floor((rozdil % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let m = Math.floor((rozdil % (1000 * 60 * 60)) / (1000 * 60));
        let s = Math.floor((rozdil % (1000 * 60)) / 1000);

        let text = "Nápověda se zobrazí za<br>";

        if (h != 0) text += h + "h ";
        if (m != 0) text += m + "m ";
        text += s + "s";
        document.getElementById("napoveda").innerHTML = text;
    }
    else {
        // Ukaz napovedu ve 23:00
        document.getElementById("napoveda").innerHTML = "NÁPOVĚDA:<br>" + napoveda;
    }
    // setTimeout(ukaz_napovedu(napoveda), 1000);
    setTimeout(ukaz_napovedu.bind(null, napoveda), 1000);

}

function zkontroluj(tajenka) {
    let input = document.getElementById("vstup").value;
    input = input.trim().toLowerCase(); // Zbav se zbytecnych mezer
    input = input.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Zbav se diakritiky

    info = document.getElementById("info");
    image = document.getElementById("mapa");

    if (input == tajenka) { // spravne
        image.style.display = "block";
        unfade(image);

        info.style.display = "block";
        info.innerHTML = "Uhádl/a jsi správně! <br>Další indicie hledej podle mapy:";
        info.style.color = "green";
        info.style.borderColor = "green";
        info.style.backgroundColor = "lightgreen";

        unfade(info);
    } else { // Spatne
        image.style.display = "none";

        info.style.display = "block";
        info.innerHTML = "Tohle není správná odpověď<br>Zkus to znovu";
        info.style.color = "red";
        info.style.borderColor = "red";
        info.style.backgroundColor = "#fadbd8";

        unfade(info);
    }
}



// CSS EFEKTY

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